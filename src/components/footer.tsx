import { Github, Linkedin, Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <p className="font-headline text-lg font-semibold">Caption Crafty</p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Caption Crafty. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <div className="flex items-center gap-2">
            <Link href="https://github.com/RohanShrivastava08" target="_blank" rel="noopener noreferrer" aria-label="Github">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
            <Link href="https://www.linkedin.com/in/rohan-shrivastava-887a15251/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
