import { CaptionGenerator } from '@/components/caption-generator';
import { FAQ } from '@/components/faq';
import { Features } from '@/components/features';
import { Showcase } from '@/components/showcase';
import { SocialProof } from '@/components/social-proof';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <section className="w-full">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-4 py-20 text-center md:py-32">
          <div className="flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by Generative AI</span>
          </div>
          <h1 className="font-headline text-4xl font-semibold md:text-6xl">
            Effortless AI Captions that<br /> <span className="text-primary">Engage & Convert</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Stop wasting hours on writer's block. CaptionCraft AI generates captivating, on-brand social media captions in seconds, tailored to any platform.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="#generator">Try It Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#showcase">See an Example</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <SocialProof />

      <Features />

      <Showcase />

      <section id="generator" className="w-full py-20 md:py-32">
        <div className="container mx-auto flex flex-col items-center gap-6 text-center">
            <h2 className="font-headline text-3xl font-semibold md:text-5xl">Unleash Your Creativity</h2>
            <p className="max-w-xl text-lg text-muted-foreground">
              Upload your media, fine-tune the settings, and let our AI craft the perfect message for your audience.
            </p>
        </div>
        <CaptionGenerator />
      </section>

      <FAQ />
    </div>
  );
}
