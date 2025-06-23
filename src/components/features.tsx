"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BotMessageSquare, Settings2, SmilePlus, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Instant Creativity",
    description: "Generate multiple engaging captions in seconds. Overcome writer's block and save precious time.",
  },
  {
    icon: <Settings2 className="w-8 h-8 text-primary" />,
    title: "Fully Customizable",
    description: "Tailor captions for any platform, tone, and theme. Get content that perfectly matches your brand voice.",
  },
  {
    icon: <SmilePlus className="w-8 h-8 text-primary" />,
    title: "Boost Engagement",
    description: "Craft messages that resonate with your audience, complete with smart emojis and trending hashtags.",
  },
  {
    icon: <BotMessageSquare className="w-8 h-8 text-primary" />,
    title: "Advanced AI",
    description: "Powered by cutting-edge generative AI to understand your media and deliver high-quality, relevant captions.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-semibold md:text-5xl">The Ultimate Content Assistant</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            CaptionCrafty AI provides everything you need to supercharge your social media workflow.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
