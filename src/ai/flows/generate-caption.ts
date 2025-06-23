// src/ai/flows/generate-caption.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating platform-optimized captions for images.
 *
 * - generatePlatformOptimizedCaption - A function that generates captions based on the image and context.
 * - GeneratePlatformOptimizedCaptionInput - The input type for the generatePlatformOptimizedCaption function.
 * - GeneratePlatformOptimizedCaptionOutput - The return type for the generatePlatformOptimizedCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlatformOptimizedCaptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to generate captions for, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  platform: z
    .enum(['Instagram', 'LinkedIn', 'YouTube'])
    .describe('The social media platform for which the caption will be used.'),
  moodTone: z
    .enum(['Professional', 'Casual', 'Funny', 'Trendy'])
    .describe('The desired mood or tone of the caption.'),
  outputFormat: z
    .enum(['Paragraph', 'Bullet Points'])
    .describe('The desired format for the main caption text.'),
  theme: z
    .enum(['Travel', 'Fitness', 'Fashion', 'Tech', 'Food'])
    .optional()
    .describe('The theme of the content (optional).'),
  fileName: z.string().describe('The name of the uploaded file.'),
});

export type GeneratePlatformOptimizedCaptionInput = z.infer<typeof GeneratePlatformOptimizedCaptionInputSchema>;

const GeneratePlatformOptimizedCaptionOutputSchema = z.object({
  captions: z.array(
    z.object({
      headline: z.string().describe('A bold headline or hook (4–8 words).'),
      caption: z.string().describe('A well-written caption with two short paragraphs. It should be formatted as requested by the user.'),
      hashtags: z.string().describe('5–6 relevant and trending hashtags.'),
    })
  ).describe('An array of stylized captions.'),
});

export type GeneratePlatformOptimizedCaptionOutput = z.infer<typeof GeneratePlatformOptimizedCaptionOutputSchema>;

export async function generatePlatformOptimizedCaption(input: GeneratePlatformOptimizedCaptionInput): Promise<GeneratePlatformOptimizedCaptionOutput> {
  return generateCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionPrompt',
  input: {schema: GeneratePlatformOptimizedCaptionInputSchema},
  output: {schema: GeneratePlatformOptimizedCaptionOutputSchema},
  prompt: `You are a creative caption generator. Based on the uploaded media and the following context, generate 2-3 stylized captions. Each should include:
  - A bold headline or hook (4–8 words)
  - A well-written caption with 2 short paragraphs: one describing the media vibe, one engaging the audience. IMPORTANT: The caption text itself must be written in a '{{{outputFormat}}}' style.
  - 5–6 relevant and trending hashtags
  - Use emojis smartly and make the caption suitable for {{{platform}}}

  Media context:
  Platform: {{{platform}}}
  Tone: {{{moodTone}}}
  Theme: {{{theme}}}
  Output Format: {{{outputFormat}}}
  File: {{{fileName}}}
  Photo: {{media url=photoDataUri}}`,
});

const generateCaptionFlow = ai.defineFlow(
  {
    name: 'generateCaptionFlow',
    inputSchema: GeneratePlatformOptimizedCaptionInputSchema,
    outputSchema: GeneratePlatformOptimizedCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
