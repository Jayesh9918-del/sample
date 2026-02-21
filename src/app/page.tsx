
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Sparkles, LayoutGrid, Users } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main");
  const projects = [
    { title: "The Obsidian Loft", location: "Berlin, Germany", category: "Residential", img: "project-1" },
    { title: "Verdant Heights", location: "Singapore", category: "Sustainable", img: "project-2" },
    { title: "Lumina Library", location: "Vancouver, Canada", category: "Public", img: "project-3" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              priority
              className="object-cover brightness-50 scale-105 transition-transform duration-10000"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
              Architectural Excellence <br /> <span className="text-accent">Redefined</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Architechs.io bridges the gap between visionary design and modern urban living. Discover projects that shape the world we live in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white border-none h-14 px-8 text-lg">
                <Link href="/portfolio">Explore Portfolio</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 h-14 px-8 text-lg backdrop-blur-sm">
                <Link href="/ai-generator">
                  <Sparkles className="mr-2 h-5 w-5" /> AI Design Ideas
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Expertise</h2>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-muted transition-colors duration-300">
                <div className="p-4 rounded-full bg-accent/10 mb-6">
                  <LayoutGrid className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3">Project Curation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We handpick architectural projects that demonstrate exceptional innovation, sustainability, and aesthetic value.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-muted transition-colors duration-300">
                <div className="p-4 rounded-full bg-accent/10 mb-6">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3">Global Directory</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with world-class architects and design firms. Our directory features the best talent in the industry.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-muted transition-colors duration-300">
                <div className="p-4 rounded-full bg-accent/10 mb-6">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3">AI Visioning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Harness the power of Generative AI to visualize your next architectural concept in seconds with our smart tool.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">Featured Work</h2>
                <p className="text-muted-foreground">A selection of our most groundbreaking recent projects.</p>
              </div>
              <Button variant="link" asChild className="text-accent p-0 font-bold flex items-center gap-2">
                <Link href="/portfolio">View All Projects <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((p, idx) => {
                const imgData = PlaceHolderImages.find(img => img.id === p.img);
                return (
                  <ProjectCard
                    key={idx}
                    title={p.title}
                    location={p.location}
                    category={p.category}
                    imageUrl={imgData?.imageUrl || ""}
                    imageHint={imgData?.imageHint || ""}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
