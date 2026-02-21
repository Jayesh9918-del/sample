
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, User, Clock } from "lucide-react";

const blogPosts = [
  {
    title: "The Future of Smart Cities in 2025",
    excerpt: "How urban planning is evolving with integrated AI systems to manage resources more efficiently than ever before.",
    author: "Jane Doe",
    date: "Oct 12, 2024",
    readTime: "8 min",
    img: "blog-1",
    category: "Urban Planning"
  },
  {
    title: "Innovative Sustainable Building Materials",
    excerpt: "From mushroom-based insulation to carbon-sequestering concrete, we explore the materials defining the next decade.",
    author: "Richard Smith",
    date: "Oct 10, 2024",
    readTime: "12 min",
    img: "blog-2",
    category: "Sustainability"
  },
  {
    title: "Minimalism: Is Less Still More?",
    excerpt: "A deep dive into the modern minimalist movement and why its principles are becoming more relevant in a digital world.",
    author: "Elena Rossi",
    date: "Oct 5, 2024",
    readTime: "6 min",
    img: "blog-1",
    category: "Design Theory"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-background">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Architecture News</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay ahead of the curve with our latest insights on urban planning, innovative design, and industry trends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {blogPosts.map((post, idx) => {
              const imgData = PlaceHolderImages.find(img => img.id === post.img);
              return (
                <Card key={idx} className="overflow-hidden border-none shadow-none bg-transparent group">
                  <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
                    <Image
                      src={imgData?.imageUrl || ""}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={imgData?.imageHint || ""}
                    />
                  </div>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 text-xs text-accent font-bold uppercase tracking-widest mb-4">
                      {post.category}
                    </div>
                    <Link href="#" className="block">
                      <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</div>
                      <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</div>
                      <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} read</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
