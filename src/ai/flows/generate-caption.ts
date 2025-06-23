// src/ai/flows/generate-caption.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating platform-optimized captions for images or text.
 *
 * - generatePlatformOptimizedCaption - A function that generates captions based on the image, text, and context.
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
    ).optional(),
  mediaContext: z.string().optional().describe('A text description or topic to generate content from.'),
  platform: z
    .enum(['Instagram', 'LinkedIn', 'YouTube', 'X', 'Blog'])
    .describe('The social media platform or content type for which the output will be used.'),
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
  fileName: z.string().describe('The name of the uploaded file.').optional(),
});

export type GeneratePlatformOptimizedCaptionInput = z.infer<typeof GeneratePlatformOptimizedCaptionInputSchema>;

const GeneratePlatformOptimizedCaptionOutputSchema = z.object({
  captions: z.array(
    z.object({
      headline: z.string().describe('A bold headline, hook, or title (4–8 words for captions, longer for blogs).'),
      caption: z.string().describe('A well-written caption or full blog post. It should be formatted as requested by the user.'),
      hashtags: z.string().describe('5–6 relevant and trending hashtags or keywords, separated by spaces.'),
    })
  ).describe('An array of stylized captions or a single blog post.'),
});

export type GeneratePlatformOptimizedCaptionOutput = z.infer<typeof GeneratePlatformOptimizedCaptionOutputSchema>;

export async function generatePlatformOptimizedCaption(input: GeneratePlatformOptimizedCaptionInput): Promise<GeneratePlatformOptimizedCaptionOutput> {
  return generateCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionPrompt',
  input: {schema: GeneratePlatformOptimizedCaptionInputSchema},
  output: {schema: GeneratePlatformOptimizedCaptionOutputSchema},
  prompt: `You are a versatile AI content creator specializing in social media and blogs. Your output must be in a valid JSON format that adheres to the provided schema.

The user wants content for the '{{{platform}}}' platform.

**CONTENT GENERATION LOGIC:**

1.  **IF the platform is 'Blog':**
    - Generate a single, well-structured, engaging blog post (around 3-4 paragraphs) based on the \`mediaContext\`.
    - The \`captions\` array in your output should contain exactly ONE object.
    - In that object, the \`headline\` field should be a compelling title for the blog post.
    - The \`caption\` field should contain the full blog post formatted in Markdown (use headings, lists, bold text etc.).
    - The \`hashtags\` field should contain 5-6 relevant keywords, separated by spaces (e.g., "#keyword1 #keyword2").

2.  **IF the platform is NOT 'Blog' (e.g., Instagram, X, LinkedIn, YouTube):**
    - Generate 2-3 stylized captions.
    - Base your generation primarily on the \`photoDataUri\` if provided. If not, use the \`mediaContext\`.
    - Each generated caption object in the \`captions\` array must include:
        a. \`headline\`: A bold headline or hook (4–8 words).
        b. \`caption\`: A well-written caption of two short paragraphs, formatted as a '{{{outputFormat}}}'.
        c. \`hashtags\`: 5–6 relevant and trending hashtags, separated by spaces.
    - Use emojis smartly and make the caption suitable for the target platform.

**PROVIDED INPUT:**
- Platform: {{{platform}}}
- Tone (for social media): {{{moodTone}}}
{{#if theme}}- Theme: {{{theme}}}{{/if}}
- Output Format (for captions): {{{outputFormat}}}
{{#if mediaContext}}- Provided Topic/Context: {{{mediaContext}}}{{/if}}
{{#if fileName}}- File Name: {{{fileName}}}{{/if}}
- Attached Media: {{#if photoDataUri}}{{media url=photoDataUri}}{{else}}None{{/if}}`,
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
