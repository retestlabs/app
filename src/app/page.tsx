import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-3xl">
        The A/B testing platform for quick product teams
      </h1>
      <Button>Get Started</Button>
    </main>
  );
}
