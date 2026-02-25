import type { Metadata } from "next";
import { AuthForm } from "../sign-in/auth-form";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your PulseAnalytics account. Start your 14-day free trial.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />;
}
