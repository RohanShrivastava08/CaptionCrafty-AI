'use server';

/**
 * @fileOverview AI agent that allows the user to specify a mood or tone for the generated captions.
 *
 * - tuneCaption - A function that handles the caption tuning process.
 * - TuneCaptionInput - The input type for the tuneCaption function.
 * - TuneCaptionOutput - The return type for the tuneCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TuneCaptionInputSchema = z.object({
  mediaContext: z.string().describe('The context of the media for which captions are to be generated.'),
  platform: z.enum(['Instagram', 'LinkedIn', 'YouTube']).describe('The social media platform for which the caption is intended.'),
  moodTone: z.string().describe('The desired mood or tone for the caption (e.g., funny, professional, trendy).'),
  fileName: z.string().describe('The name of the file being captioned.'),
});
export type TuneCaptionInput = z.infer<typeof TuneCaptionInputSchema>;

const TuneCaptionOutputSchema = z.object({
  headline: z.string().describe('A bold headline or hook (4–8 words).'),
  captionOptions: z.array(z.string()).describe('2-3 stylized caption options.'),
  hashtags: z.array(z.string()).describe('5–6 relevant and trending hashtags.'),
});
export type TuneCaptionOutput = z.infer<typeof TuneCaptionOutputSchema>;

export async function tuneCaption(input: TuneCaptionInput): Promise<TuneCaptionOutput> {
  return tuneCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tuneCaptionPrompt',
  input: {schema: TuneCaptionInputSchema},
  output: {schema: TuneCaptionOutputSchema},
  prompt: `You are a creative caption generator. Based on the uploaded media and the following context, generate 2-3 stylized captions. Each should include:
  - A bold headline or hook (4–8 words)
  - A well-written caption with 2 short paragraphs: one describing the media vibe, one engaging the audience
  - 5–6 relevant and trending hashtags
  - Use emojis smartly and make the caption suitable for {{{platform}}}
Media context:
Platform: {{{platform}}}
Tone: {{{moodTone}}}
Theme: {{{mediaContext}}}
File: {{{fileName}}}
`,
});

const tuneCaptionFlow = ai.defineFlow(
  {
    name: 'tuneCaptionFlow',
    inputSchema: TuneCaptionInputSchema,
    outputSchema: TuneCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
