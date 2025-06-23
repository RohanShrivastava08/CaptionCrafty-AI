import Image from 'next/image';
import { cn } from '@/lib/utils';

const images = [
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 1", hint: "travel blogger" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 2", hint: "fitness influencer" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 3", hint: "food photography" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 4", hint: "fashion model" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 5", hint: "tech gadget" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 6", hint: "product photography" },
  { src: "https://placehold.co/400x600.png", alt: "Social media post example 7", hint: "city life" },
];

const Marquee = ({ children, vertical = false, ...props }) => {
  return (
    <div
      {...props}
      className={cn("group flex gap-4 overflow-hidden p-4", {
        "flex-col": vertical,
        "flex-row": !vertical,
      })}
    >
      {children}
      {children}
    </div>
  );
};

export function SocialProof() {
  return (
    <section className="w-full bg-background py-10 md:py-20">
      <div className="relative">
        <div
          className="pointer-events-none absolute -top-1 z-10 h-1/3 w-full bg-gradient-to-b from-background to-transparent"
        ></div>
        <div
          className="pointer-events-none absolute -bottom-1 z-10 h-1/3 w-full bg-gradient-to-t from-background to-transparent"
        ></div>
        <div className="container mx-auto flex justify-center">
          <div className="relative w-full max-w-7xl [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <Marquee className=" [--duration:60s] group-hover:[animation-play-state:paused]">
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
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
