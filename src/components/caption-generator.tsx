"use client";

import { useState } from 'react';
import type { GeneratePlatformOptimizedCaptionOutput } from '@/ai/flows/generate-caption';
import { generatePlatformOptimizedCaption } from '@/ai/flows/generate-caption';
import { AlertCircle, FileImage, Loader2, Type, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';
import { CaptionCard } from './caption-card';
import { FileUploader } from './file-uploader';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';

type Platform = 'Instagram' | 'LinkedIn' | 'YouTube' | 'X' | 'Blog';
type MoodTone = 'Professional' | 'Casual' | 'Funny' | 'Trendy';
type Theme = 'Travel' | 'Fitness' | 'Fashion' | 'Tech' | 'Food';
type OutputFormat = 'Paragraph' | 'Bullet Points';
type InputType = 'media' | 'text';

export function CaptionGenerator() {
  const [inputType, setInputType] = useState<InputType>('media');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [mediaContext, setMediaContext] = useState('');
  
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
    if (inputType === 'media' && !file) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please upload an image or video.' });
      return;
    }
    if (inputType === 'text' && !mediaContext.trim()) {
      toast({ variant: 'destructive', title: 'No text provided', description: 'Please describe your topic.' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setCaptions(null);

    try {
      const photoDataUri = inputType === 'media' && file ? await fileToDataUri(file) : undefined;
      const result = await generatePlatformOptimizedCaption({
        photoDataUri: photoDataUri,
        mediaContext: inputType === 'text' ? mediaContext : undefined,
        platform,
        moodTone,
        theme: theme || undefined,
        outputFormat,
        fileName: file?.name,
      });
      setCaptions(result.captions);
    } catch (e) {
      console.error(e);
      setError('Failed to generate content. The AI model might be busy or the request may have been filtered. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isSubmitDisabled = isLoading || (inputType === 'media' && !file) || (inputType === 'text' && !mediaContext.trim());

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
      <Card className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
          
          <div className="bg-card p-6 lg:p-8 space-y-6">
            <Tabs value={inputType} onValueChange={(v) => setInputType(v as InputType)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="media"><FileImage className="mr-2" /> From Media</TabsTrigger>
                    <TabsTrigger value="text"><Type className="mr-2" /> From Text</TabsTrigger>
                </TabsList>
                <TabsContent value="media" className="space-y-4 pt-4">
                    <Label className="text-base font-medium">1. Upload Your Media</Label>
                    <FileUploader onFileSelect={handleFileSelect} filePreview={filePreview} />
                </TabsContent>
                <TabsContent value="text" className="space-y-4 pt-4">
                    <Label className="text-base font-medium">1. Describe Your Content</Label>
                    <Textarea 
                      placeholder="e.g., A blog post about the benefits of remote work..."
                      className="min-h-[256px] text-base"
                      value={mediaContext}
                      onChange={(e) => setMediaContext(e.target.value)}
                    />
                </TabsContent>
            </Tabs>

            <div>
              <Label className="text-base font-medium">2. Customize Your Output</Label>
              <p className="text-sm text-muted-foreground mb-4">Tailor the AI to your specific needs</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium">Platform / Type</Label>
                  <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                    <SelectTrigger><SelectValue placeholder="Select platform..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="X">X (Twitter)</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Blog">Blog Post</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {platform !== 'Blog' && (
                  <>
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
                    <div>
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
                  </>
                )}
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={isSubmitDisabled} className="w-full text-lg py-6">
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wand2 className="mr-2 h-6 w-6" />}
              Generate Content
            </Button>
          </div>
          
          <div className="bg-background/80 dark:bg-secondary/20 p-6 lg:p-8 flex flex-col min-h-[500px] lg:min-h-[700px]">
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
                    <h3 className="text-xl font-semibold text-foreground">Your AI Content Appears Here</h3>
                    <p className="mt-2 text-base max-w-sm">Provide your media or text, set your options, and let the magic happen.</p>
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
