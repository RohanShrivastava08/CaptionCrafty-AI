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
import { Textarea } from './ui/textarea';

type Platform = 'Instagram' | 'LinkedIn' | 'YouTube' | 'X' | 'Blog';
type MoodTone = 'Professional' | 'Casual' | 'Funny' | 'Trendy';
type Theme = 'Travel' | 'Fitness' | 'Fashion' | 'Tech' | 'Food';
type OutputFormat = 'Paragraph' | 'Bullet Points';

export function CaptionGenerator() {
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
    setMediaContext(''); // Clear text input when file is selected
    setCaptions(null);
    setError(null);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMediaContext(e.target.value);
    if (e.target.value) {
        setFile(null); // Clear file input when text is entered
        setFilePreview(null);
    }
  }

  const fileToDataUri = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!file && !mediaContext.trim()) {
      toast({ variant: 'destructive', title: 'No input provided', description: 'Please either upload an image or describe your topic.' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setCaptions(null);

    try {
      const photoDataUri = file ? await fileToDataUri(file) : undefined;
      const result = await generatePlatformOptimizedCaption({
        photoDataUri: photoDataUri,
        mediaContext: mediaContext.trim() ? mediaContext : undefined,
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
  
  const isSubmitDisabled = isLoading || (!file && !mediaContext.trim());

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
      <Card className="w-full bg-card/80 backdrop-blur-sm border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/50 rounded-lg overflow-hidden">
          
          <div className="bg-transparent p-6 lg:p-8 space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2"><Type className="w-5 h-5" /> 1. Provide Content</Label>
              <p className="text-sm text-muted-foreground">Start with a topic or upload your media below.</p>
              <Textarea 
                placeholder="e.g., A blog post about the benefits of remote work..."
                className="min-h-[120px] text-base bg-background/50"
                value={mediaContext}
                onChange={handleTextChange}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-grow h-px bg-border/50"></div>
              <span className="text-muted-foreground font-medium text-sm">OR</span>
              <div className="flex-grow h-px bg-border/50"></div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2"><FileImage className="w-5 h-5" /> 2. Upload Your Media</Label>
              <FileUploader onFileSelect={handleFileSelect} filePreview={filePreview} />
            </div>

            <div>
              <Label className="text-base font-medium">3. Customize Your Output</Label>
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
          
          <div className="bg-background/10 dark:bg-secondary/10 p-6 lg:p-8 flex flex-col min-h-[500px] lg:min-h-[700px]">
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
