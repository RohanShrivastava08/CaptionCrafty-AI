"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
    {
        question: "What kind of media can I upload?",
        answer: "CaptionCraft AI supports both images (JPEG, PNG, WEBP) and video files (MP4, MOV). Our AI analyzes the visual content to generate relevant captions.",
    },
    {
        question: "How does the AI generate captions?",
        answer: "We use a state-of-the-art generative AI model that understands the content and context of your media. It combines this with your chosen settings (platform, tone, theme) to produce creative and relevant captions.",
    },
    {
        question: "Can I use the generated captions for commercial purposes?",
        answer: "Absolutely! All captions generated are yours to use as you wish, including for commercial social media accounts, marketing campaigns, and more.",
    },
    {
        question: "How are the hashtags selected?",
        answer: "Our AI identifies key themes in your media and combines them with currently trending topics related to your chosen platform and theme to suggest hashtags that can maximize your reach.",
    },
    {
        question: "Is there a limit to how many captions I can generate?",
        answer: "During our initial launch, you can generate captions for free without any limits. We may introduce subscription plans in the future to support the service."
    }
];

export function FAQ() {
    return (
        <section id="faq" className="w-full py-20 md:py-32 bg-secondary/50">
            <div className="container mx-auto max-w-4xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="font-headline text-3xl font-semibold md:text-5xl">Frequently Asked Questions</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Have questions? We've got answers. Here are some of the most common things we get asked.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg text-left hover:no-underline">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
