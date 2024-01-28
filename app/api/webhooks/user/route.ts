import prisma from "@/app/lib/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import Stripe from "stripe";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*';

type Event = {
    data: EventDataType;
    object: 'event';
    type: EventType;
}

type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: EmailAddressType[];
    primary_email_address_id: string;
    attributes: Record<string, string | number>;
}

type EmailAddressType = {
    id: string;
    email_address: string;
}

async function handler(request: Request) {
    const payload = await request.json();
    const headeList = headers();
    const heads = {
        'svix-id': headeList.get('svix-id'),
        'svix-timestamp': headeList.get('svix-timestamp'),
        'svix-signature': headeList.get('svix-signature'),
    }

    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({}, { status: 400 });
    }

    const eventType: EventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, first_name, last_name, email_addresses, primary_email_address_id, ...attributes } = evt.data;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        const customer = await stripe.customers.create({
            name: `${first_name} ${last_name}`,
            email: email_addresses ? email_addresses[0].email_address : '',
        })

        await prisma.user.upsert({
            where: { externalId: id as string },
            create: {
                externalId: id as string,
                stripeCustomerId: customer.id,
                attributes
            },
            update: {
                attributes
            }
        });

        return NextResponse.json({}, { status: 200 });
    }
    if (eventType === 'user.deleted') {
        const { id } = evt.data;
        await prisma.user.delete({
            where: {
                externalId: id
            }
        });

        return NextResponse.json({}, { status: 200 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;