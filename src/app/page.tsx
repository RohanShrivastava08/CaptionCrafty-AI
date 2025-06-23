import { CaptionGenerator } from '@/components/caption-generator';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start bg-background">
      <CaptionGenerator />
    </main>
  );
}
