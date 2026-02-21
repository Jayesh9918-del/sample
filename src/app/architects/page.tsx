
"use client"

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArchitectCard } from "@/components/ArchitectCard";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search } from "lucide-react";

const architects = [
  {
    name: "Julian Sterling",
    role: "Senior Design Architect with 15 years experience in urban luxury housing.",
    projectsCount: 24,
    specialty: "Residential",
    img: "architect-1"
  },
  {
    name: "Elena Rossi",
    role: "Lead Sustainability Consultant specializing in vertical gardens and zero-emission buildings.",
    projectsCount: 18,
    specialty: "Eco-Design",
    img: "architect-2"
  },
  {
    name: "Marcus Thorne",
    role: "Industrial renovation expert known for transforming old warehouses into modern office spaces.",
    projectsCount: 31,
    specialty: "Renovation",
    img: "architect-1"
  },
  {
    name: "Sophia Chen",
    role: "Award-winning public space designer focusing on libraries and community centers.",
    projectsCount: 12,
    specialty: "Public Space",
    img: "architect-2"
  }
];

export default function ArchitectsPage() {
  const [search, setSearch] = useState("");

  const filteredArchitects = architects.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-body bg-background">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Architect Directory</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with the industry's most talented visionaries. Search through our global network of architects.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialty..."
                className="pl-10 h-12 bg-white border-none shadow-sm focus-visible:ring-accent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {filteredArchitects.length > 0 ? (
              filteredArchitects.map((a, idx) => {
                const imgData = PlaceHolderImages.find(img => img.id === a.img);
                return (
                  <ArchitectCard
                    key={idx}
                    name={a.name}
                    role={a.role}
                    projectsCount={a.projectsCount}
                    specialty={a.specialty}
                    imageUrl={imgData?.imageUrl || ""}
                    imageHint={imgData?.imageHint || ""}
                  />
                );
              })
            ) : (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <p className="text-muted-foreground italic">No architects found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
