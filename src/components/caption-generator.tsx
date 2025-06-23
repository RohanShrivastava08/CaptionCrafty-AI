"use client";

import { useState } from 'react';
import type { GeneratePlatformOptimizedCaptionOutput } from '@/ai/flows/generate-caption';
import { generatePlatformOptimizedCaption } from '@/ai/flows/generate-caption';
import { AlertCircle, FileImage, Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';
import { CaptionCard } from './caption-card';
import { FileUploader } from './file-uploader';
import { useToast } from '@/hooks/use-toast';

type Platform = 'Instagram' | 'LinkedIn' | 'YouTube';
type MoodTone = 'Professional' | 'Casual' | 'Funny' | 'Trendy';
type Theme = 'Travel' | 'Fitness' | 'Fashion' | 'Tech' | 'Food';
type OutputFormat = 'Paragraph' | 'Bullet Points';

export function CaptionGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [moodTone, setMoodTone] = useState<MoodTone>('Casual');
  const [theme, setTheme] = useState<Theme | ''>('');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('Paragraph');
  
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
        outputFormat,
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
      <Card className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
          
          <div className="bg-card p-6 lg:p-8 space-y-6">
            <div>
              <Label className="text-base font-medium">1. Upload Your Media</Label>
              <p className="text-sm text-muted-foreground mb-4">Drag & drop or select a file</p>
              <FileUploader onFileSelect={handleFileSelect} filePreview={filePreview} />
            </div>

            <div>
              <Label className="text-base font-medium">2. Customize Your Caption</Label>
              <p className="text-sm text-muted-foreground mb-4">Tailor the AI to your specific needs</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Platform</Label>
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
                  <Label className="text-sm font-medium">Mood & Tone</Label>
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
                <div className="sm:col-span-2">
                   <Label className="text-sm font-medium">Theme (Optional)</Label>
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
                <div className='sm:col-span-2'>
                  <Label className="text-sm font-medium">Output Format</Label>
                  <RadioGroup value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)} className="flex items-center gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Paragraph" id="r1" />
                        <Label htmlFor="r1">Paragraph</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Bullet Points" id="r2" />
                        <Label htmlFor="r2">Bullet Points</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full text-lg py-6">
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wand2 className="mr-2 h-6 w-6" />}
              Generate Captions
            </Button>
          </div>
          
          <div className="bg-secondary/20 p-6 lg:p-8 flex flex-col min-h-[500px] lg:min-h-[700px]">
            <div className="flex-grow">
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-48 rounded-lg" />
                    <Skeleton className="w-full h-48 rounded-lg" />
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
                  <div className="text-center text-muted-foreground pt-24 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                      <FileImage className="h-10 w-10 text-muted-foreground/70" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Your AI Captions Appear Here</h3>
                    <p className="mt-2 text-base">Upload your media and set your options to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
