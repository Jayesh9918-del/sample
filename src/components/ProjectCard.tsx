
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  imageUrl: string;
  imageHint: string;
}

export function ProjectCard({ title, location, category, imageUrl, imageHint }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-none bg-transparent shadow-none transition-all hover:translate-y-[-4px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <Link href="/portfolio" className="text-white flex items-center gap-2 font-medium">
            View Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <CardContent className="pt-4 px-0">
        <div className="flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider mb-2">
          {category}
        </div>
        <h3 className="font-headline text-xl font-bold text-primary group-hover:text-accent transition-colors">{title}</h3>
      </CardContent>
      <CardFooter className="px-0 pb-2 flex items-center text-muted-foreground text-sm">
        <MapPin className="h-3 w-3 mr-1" /> {location}
      </CardFooter>
    </Card>
  );
}
