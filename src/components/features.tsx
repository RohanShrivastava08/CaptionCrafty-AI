"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, PenSquare, Share2, Smile } from "lucide-react";

const features = [
  {
    icon: <PenSquare className="w-8 h-8 text-primary" />,
    title: "AI-Powered Captions",
    description: "Generate creative and engaging captions in seconds with our advanced AI. Never run out of ideas again.",
  },
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: "Platform Optimized",
    description: "Get captions tailored for Instagram, LinkedIn, YouTube, and more, formatted for maximum impact on each platform.",
  },
  {
    icon: <Smile className="w-8 h-8 text-primary" />,
    title: "Mood & Tone Control",
    description: "Choose from a variety of tones—professional, casual, funny, or trendy—to perfectly match your brand's voice.",
  },
  {
    icon: <Hash className="w-8 h-8 text-primary" />,
    title: "Smart Hashtags",
    description: "Automatically receive relevant and trending hashtags to increase your content's visibility and reach.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-semibold md:text-5xl">Why Choose CaptionCraft?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Everything you need to supercharge your social media game.
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
