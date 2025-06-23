"use client";

import { useState } from 'react';
import type { GeneratePlatformOptimizedCaptionOutput } from '@/ai/flows/generate-caption';
import { generatePlatformOptimizedCaption } from '@/ai/flows/generate-caption';
import { AlertCircle, FileImage, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';
import { CaptionCard } from './caption-card';
import { FileUploader } from './file-uploader';
import { useToast } from '@/hooks/use-toast';

type Platform = 'Instagram' | 'LinkedIn' | 'YouTube';
type MoodTone = 'Professional' | 'Casual' | 'Funny' | 'Trendy';
type Theme = 'Travel' | 'Fitness' | 'Fashion' | 'Tech' | 'Food';

export function CaptionGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [moodTone, setMoodTone] = useState<MoodTone>('Casual');
  const [theme, setTheme] = useState<Theme | ''>('');
  
  const [captions, setCaptions] = useState<GeneratePlatformOptimizedCaptionOutput['captions'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
    setCaptions(null);
    setError(null);
  };
  
  const fileToDataUri = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please upload an image or video first.' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setCaptions(null);

    try {
      const photoDataUri = await fileToDataUri(file);
      const result = await generatePlatformOptimizedCaption({
        photoDataUri,
        platform,
        moodTone,
        theme: theme || undefined,
        fileName: file.name,
      });
      setCaptions(result.captions);
    } catch (e) {
      console.error(e);
      setError('Failed to generate captions. The AI model might be busy. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold text-primary flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10" />
          CaptionCraft AI
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Upload your photo or reel, and let our AI craft the perfect, platform-optimized captions for you in seconds.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">1. Upload Media</CardTitle>
              <CardDescription>Drag & drop or select a file</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader onFileSelect={handleFileSelect} filePreview={filePreview} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">2. Customize</CardTitle>
              <CardDescription>Tailor the AI to your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Platform</label>
                <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                  <SelectTrigger><SelectValue placeholder="Select platform..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Mood & Tone</label>
                <Select value={moodTone} onValueChange={(v) => setMoodTone(v as MoodTone)}>
                  <SelectTrigger><SelectValue placeholder="Select mood..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Funny">Funny</SelectItem>
                    <SelectItem value="Trendy">Trendy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Theme (Optional)</label>
                <Select value={theme} onValueChange={(v) => setTheme(v === 'none' ? '' : v as Theme)}>
                  <SelectTrigger><SelectValue placeholder="Select theme..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full text-lg py-6">
            {isLoading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-6 w-6" />
            )}
            Generate Captions
          </Button>
        </div>

        <div className="lg:col-span-3">
          <Card className="min-h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Your AI-Generated Captions</CardTitle>
              <CardDescription>Click to copy your favorite caption.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-44 rounded-lg" />
                    <Skeleton className="w-full h-44 rounded-lg" />
                  </>
                ) : error ? (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Generation Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : captions ? (
                  captions.map((cap, index) => <CaptionCard key={index} captionData={cap} />)
                ) : (
                  <div className="text-center text-muted-foreground py-24 flex flex-col items-center justify-center h-full">
                    <FileImage className="mx-auto h-16 w-16" />
                    <p className="mt-4 text-lg">Your generated captions will appear here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
