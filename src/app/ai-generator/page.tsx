
"use client"

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateArchitecturalDesignIdeas, type GenerateArchitecturalDesignIdeasOutput } from "@/ai/flows/generate-architectural-design-ideas";
import { Sparkles, Loader2, MapPin, Hammer, Palette, Plus, X } from "lucide-react";

export default function AIGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GenerateArchitecturalDesignIdeasOutput | null>(null);
  
  const [location, setLocation] = useState("");
  const [style, setStyle] = useState("");
  const [materialInput, setMaterialInput] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [specInput, setSpecInput] = useState("");
  const [specifications, setSpecifications] = useState<string[]>([]);

  const addMaterial = () => {
    if (materialInput && !materials.includes(materialInput)) {
      setMaterials([...materials, materialInput]);
      setMaterialInput("");
    }
  };

  const addSpecification = () => {
    if (specInput && !specifications.includes(specInput)) {
      setSpecifications([...specifications, specInput]);
      setSpecInput("");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !style || materials.length === 0) return;

    setLoading(true);
    try {
      const output = await generateArchitecturalDesignIdeas({
        location,
        style,
        materials,
        specifications
      });
      setResults(output);
    } catch (error) {
      console.error("Failed to generate ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-background">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30 border-none px-4 py-1">AI Powered Tool</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">AI Concept Generator</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Describe your vision, and our advanced AI will craft unique architectural concepts, selecting the perfect materials and structural philosophy for your location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Input Form */}
            <Card className="lg:col-span-1 h-fit border-none shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Design Parameters</CardTitle>
                <CardDescription>Input your project requirements below.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Location</Label>
                    <Input 
                      placeholder="e.g. Coastal California, Urban Tokyo" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Palette className="h-3 w-3" /> Architectural Style</Label>
                    <Input 
                      placeholder="e.g. Minimalist, Art Deco, Modern" 
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Hammer className="h-3 w-3" /> Materials</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="e.g. Concrete, Oak, Glass" 
                        value={materialInput}
                        onChange={(e) => setMaterialInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                      />
                      <Button type="button" size="icon" onClick={addMaterial} variant="secondary"><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {materials.map(m => (
                        <Badge key={m} variant="outline" className="flex items-center gap-1 py-1 px-2">
                          {m} <X className="h-3 w-3 cursor-pointer" onClick={() => setMaterials(materials.filter(x => x !== m))} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">Extra Specs (Optional)</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="e.g. Rooftop garden, Home office" 
                        value={specInput}
                        onChange={(e) => setSpecInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                      />
                      <Button type="button" size="icon" onClick={addSpecification} variant="secondary"><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {specifications.map(s => (
                        <Badge key={s} variant="outline" className="flex items-center gap-1 py-1 px-2">
                          {s} <X className="h-3 w-3 cursor-pointer" onClick={() => setSpecifications(specifications.filter(x => x !== s))} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 h-12"
                    disabled={loading || !location || !style || materials.length === 0}
                  >
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Ideas...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Ideas</>}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Area */}
            <div className="lg:col-span-2 space-y-8">
              {!results && !loading && (
                <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-2xl bg-white/50 p-8 text-center">
                  <div className="p-6 rounded-full bg-muted mb-6">
                    <Sparkles className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-muted-foreground mb-2">Ready to Visualize?</h3>
                  <p className="text-muted-foreground max-w-sm">Enter your project parameters on the left and click generate to see AI-powered architectural concepts.</p>
                </div>
              )}

              {loading && (
                <div className="space-y-8 animate-pulse">
                  {[1, 2].map(i => (
                    <div key={i} className="h-64 bg-white rounded-2xl"></div>
                  ))}
                </div>
              )}

              {results && results.designIdeas.map((idea, idx) => (
                <Card key={idx} className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="font-headline text-3xl font-bold text-primary">{idea.title}</h2>
                      <Badge className="bg-accent/10 text-accent border-none">Concept {idx + 1}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-8 leading-relaxed italic">
                      {idea.moodBoardDescription}
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-primary mb-3">Conceptual Philosophy</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {idea.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-primary mb-3">Key Design Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {idea.keyFeatures.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 px-8 py-4 border-t flex justify-end gap-3">
                    <Button variant="outline" size="sm">Save Concept</Button>
                    <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-white">Export Specs</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
