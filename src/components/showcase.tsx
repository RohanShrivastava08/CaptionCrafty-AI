"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { CaptionCard } from "./caption-card";
import { CheckCircle2 } from "lucide-react";

const sampleInput = {
    platform: 'Instagram',
    moodTone: 'Trendy',
    theme: 'Travel',
};

const sampleOutput = {
    captions: [
        {
            headline: "Golden Hour, Golden Memories 🌅",
            caption: "Chasing sunsets and cityscapes. There's nothing quite like the feeling of watching the world slow down from a rooftop, with the sky painting itself in shades of orange and purple. This city has my heart. ✨\n\nWhat's a view that recently took your breath away? Share it in the comments below! I'd love to hear your stories.",
            hashtags: "#CitySunset #GoldenHour #RooftopVibes #TravelGram #UrbanExplorer #SunsetLover"
        }
    ]
};

export function Showcase() {
    return (
        <section id="showcase" className="w-full py-20 md:py-32 bg-secondary/50">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="font-headline text-3xl font-semibold md:text-5xl">See It in Action</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Check out a real example of an AI-generated caption for a travel photo on Instagram.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Input</CardTitle>
                            <CardDescription>An image uploaded with the following settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1619046339188-7256ecfb2185"
                                    alt="Cityscape at sunset"
                                    width={800}
                                    height={600}
                                    className="object-cover w-full h-full"
                                    data-ai-hint="city sunset"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge>Platform: {sampleInput.platform}</Badge>
                                <Badge>Tone: {sampleInput.moodTone}</Badge>
                                <Badge>Theme: {sampleInput.theme}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold font-headline">Generated Output</h3>
                                <p className="text-muted-foreground">One of the captions created by the AI.</p>
                            </div>
                        </div>
                        <CaptionCard captionData={sampleOutput.captions[0]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
