import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Voltora" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-4xl font-bold">Create account</h1>
        <p className="mt-2 text-muted-foreground">Join Voltora and start saving today.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const r = signup(email, password, name);
            if (!r.ok) setError(r.error || "Signup failed");
            else navigate({ to: "/account" });
          }}
          className="mt-8 space-y-4"
        >
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full rounded-full">Create account</Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/account" className="text-foreground font-medium underline">Sign in</Link>
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
