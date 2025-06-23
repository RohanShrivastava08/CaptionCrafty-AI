import Image from 'next/image';

const images = [
  { src: "https://img.freepik.com/free-vector/ai-powered-content-creation-isometric-concept-with-chatbot-laptop-screen-3d-vector-illustration_1284-82523.jpg", alt: "AI powered content creation", hint: "ai content" },
  { src: "https://img.freepik.com/free-vector/children-with-social-media-elements-white_1308-52407.jpg", alt: "Children with social media elements", hint: "social media" },
  { src: "https://img.freepik.com/premium-vector/young-people-using-gadgets-social-media_7737-3239.jpg", alt: "People using gadgets for social media", hint: "social media" },
  { src: "https://img.freepik.com/free-vector/cute-monkey-with-banner_1308-29432.jpg", alt: "Cute monkey with a banner", hint: "monkey banner" },
  { src: "https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg", alt: "Blog post illustration", hint: "blog post" },
  { src: "https://img.freepik.com/free-vector/children-with-social-media-elements-white-background_1308-50819.jpg", alt: "Kids and social media", hint: "social media" },
  { src: "https://img.freepik.com/free-vector/young-people-looking-likes-social-media_23-2148118653.jpg", alt: "People looking for likes on social media", hint: "social media likes" },
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
