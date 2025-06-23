import Image from 'next/image';
import { cn } from '@/lib/utils';

const images = [
  { src: "https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg", alt: "Instagram logo", hint: "instagram logo" },
  { src: "https://img.freepik.com/free-psd/social-media-logo-design_23-2151296981.jpg", alt: "X social media logo", hint: "x logo" },
  { src: "https://img.freepik.com/free-psd/social-media-logo-design_23-2151296989.jpg", alt: "Youtube social media logo", hint: "youtube logo" },
  { src: "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-36932.jpg", alt: "Social media concept illustration", hint: "social media" },
  { src: "https://img.freepik.com/free-psd/social-media-logo-design_23-2151296991.jpg", alt: "LinkedIn social media logo", hint: "linkedin logo" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 6", hint: "product photography" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 7", hint: "city life" },
];


export function SocialProof() {
  return (
    <section className="w-full py-10 md:py-20">
      <div className="relative">
        <div
          className="pointer-events-none absolute -top-1 z-10 h-1/3 w-full bg-gradient-to-b from-transparent via-transparent to-transparent"
        ></div>
        <div
          className="pointer-events-none absolute -bottom-1 z-10 h-1/3 w-full bg-gradient-to-t from-transparent via-transparent to-transparent"
        ></div>
        <div className="container mx-auto flex justify-center">
          <div className="relative w-full max-w-7xl [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="group flex overflow-hidden p-4">
              <div className="flex shrink-0 animate-marquee gap-4 motion-safe:group-hover:[animation-play-state:paused]">
                {images.map((image, index) => (
                  <div key={index} className="h-64 w-48 shrink-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={600}
                      data-ai-hint={image.hint}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="flex shrink-0 animate-marquee gap-4 motion-safe:group-hover:[animation-play-state:paused]">
                {images.map((image, index) => (
                  <div key={index} className="h-64 w-48 shrink-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={600}
                      data-ai-hint={image.hint}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}