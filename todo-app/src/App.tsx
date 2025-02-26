import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Index from "./pages/app/Index";

export default function App() {
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
