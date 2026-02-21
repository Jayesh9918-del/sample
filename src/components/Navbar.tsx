
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Compass, LayoutGrid, Users, BookOpen, Sparkles } from "lucide-react";

const navItems = [
  { name: "Portfolio", href: "/portfolio", icon: LayoutGrid },
  { name: "Architects", href: "/architects", icon: Users },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "AI Ideas", href: "/ai-generator", icon: Sparkles },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold tracking-tight text-primary">
            <Compass className="h-6 w-6 text-accent" />
            <span>Architechs<span className="text-accent">.io</span></span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="md:hidden">
          {/* Mobile menu could go here, for now keeping it simple as per instructions */}
        </div>
      </div>
    </nav>
  );
}
