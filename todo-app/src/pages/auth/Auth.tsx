import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Index from "../app/Index";

export default function Auth() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Index />
      </SignedIn>
    </header>
  );
}
