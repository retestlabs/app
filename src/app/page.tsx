import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-3xl">
        We help students get their first internships
      </h1>
      <Button>Get Started</Button>
    </main>
  );
}
