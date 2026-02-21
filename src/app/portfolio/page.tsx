
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const allProjects = [
  { title: "The Obsidian Loft", location: "Berlin, Germany", category: "Residential", img: "project-1" },
  { title: "Verdant Heights", location: "Singapore", category: "Sustainable", img: "project-2" },
  { title: "Lumina Library", location: "Vancouver, Canada", category: "Public", img: "project-3" },
  { title: "Steel & Glass Hub", location: "Tokyo, Japan", category: "Commercial", img: "project-4" },
  { title: "Azure Waterfront", location: "Malibu, USA", category: "Residential", img: "project-1" },
  { title: "The Cube Offices", location: "London, UK", category: "Commercial", img: "project-2" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-background">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Portfolio</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover our curated collection of architectural marvels from around the globe, spanning residential, commercial, and public spheres.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allProjects.map((p, idx) => {
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
      </main>
      <Footer />
    </div>
  );
}
