"use client";

import type { GeneratePlatformOptimizedCaptionOutput } from '@/ai/flows/generate-caption';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { Copy, Sparkles } from 'lucide-react';
import { Separator } from './ui/separator';

type CaptionData = GeneratePlatformOptimizedCaptionOutput['captions'][0];

interface CaptionCardProps {
  captionData: CaptionData;
}

export function CaptionCard({ captionData }: CaptionCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    const fullCaption = `${captionData.headline}\n\n${captionData.caption}\n\n${captionData.hashtags}`;
    navigator.clipboard.writeText(fullCaption);
    toast({
      title: "Copied to clipboard!",
      description: "The caption is ready to be pasted.",
    });
  };

  const hashtags = captionData.hashtags.split(' ').filter(h => h.startsWith('#'));

  return (
    <Card className="w-full animate-in fade-in-50 zoom-in-95 duration-500 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          {captionData.headline}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 whitespace-pre-wrap text-base leading-relaxed">{captionData.caption}</p>
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy} className="w-full">
          <Copy className="mr-2 h-4 w-4" />
          Copy Caption & Hashtags
        </Button>
      </CardFooter>
    </Card>
  );
}
