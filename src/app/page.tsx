import { CaptionGenerator } from '@/components/caption-generator';
import { Features } from '@/components/features';
import { SocialProof } from '@/components/social-proof';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <section className="w-full bg-background">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-4 py-20 text-center md:py-32">
          <div className="flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by Generative AI</span>
          </div>
          <h1 className="font-headline text-4xl font-semibold md:text-6xl">
            Craft Perfect Social Captions <br /> in <span className="text-primary">Seconds</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Tired of staring at a blank screen? Let our AI generate engaging, platform-optimized captions that stop the scroll and boost your engagement.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="#generator">Start for Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <SocialProof />

      <Features />

      <section id="generator" className="w-full py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto flex flex-col items-center gap-6 text-center">
            <h2 className="font-headline text-3xl font-semibold md:text-5xl">Try It Yourself</h2>
            <p className="max-w-xl text-lg text-muted-foreground">
                Upload your media, pick your style, and watch the magic happen.
            </p>
        </div>
        <CaptionGenerator />
      </section>
    </div>
  );
}
