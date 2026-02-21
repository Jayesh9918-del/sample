
import Link from "next/link";
import { Compass, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold tracking-tight text-primary">
              <Compass className="h-5 w-5 text-accent" />
              <span>Architechs.io</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designing the future with innovation, aesthetics, and intelligence. Your portal to the world's most inspiring architectural projects.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4 text-primary">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/portfolio" className="hover:text-accent transition-colors">Project Gallery</Link></li>
              <li><Link href="/architects" className="hover:text-accent transition-colors">Find an Architect</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Design News</Link></li>
              <li><Link href="/ai-generator" className="hover:text-accent transition-colors">AI Concept Tool</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: contact@architechs.io</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>HQ: New York, NY</li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4 text-primary">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full bg-muted hover:bg-accent hover:text-white transition-all"><Twitter className="h-4 w-4" /></Link>
              <Link href="#" className="p-2 rounded-full bg-muted hover:bg-accent hover:text-white transition-all"><Linkedin className="h-4 w-4" /></Link>
              <Link href="#" className="p-2 rounded-full bg-muted hover:bg-accent hover:text-white transition-all"><Instagram className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Architechs.io. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
