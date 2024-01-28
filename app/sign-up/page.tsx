import { SignUp } from "@clerk/nextjs";

type SignInPageProps = {
    searchParams: { redirectUrl: string }
}

export default function SignInPage({ searchParams: { redirectUrl } }: SignInPageProps) {
    return (
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignUp signInUrl="/sign-in" redirectUrl={redirectUrl} />
                </div>
            </div>
        </section>
    )
}