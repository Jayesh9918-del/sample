
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Mail } from "lucide-react";

interface ArchitectCardProps {
  name: string;
  role: string;
  projectsCount: number;
  specialty: string;
  imageUrl: string;
  imageHint: string;
}

export function ArchitectCard({ name, role, projectsCount, specialty, imageUrl, imageHint }: ArchitectCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-64 md:h-auto md:w-1/3 shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              data-ai-hint={imageHint}
            />
          </div>
          <div className="p-8 flex flex-col justify-between flex-1">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline text-2xl font-bold text-primary">{name}</h3>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-none">{specialty}</Badge>
              </div>
              <p className="text-muted-foreground mb-6">{role}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted"><Briefcase className="h-4 w-4 text-primary" /></div>
                  <div>
                    <div className="text-sm font-bold">{projectsCount}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted"><Award className="h-4 w-4 text-primary" /></div>
                  <div>
                    <div className="text-sm font-bold">12+</div>
                    <div className="text-xs text-muted-foreground">Awards</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90">View Profile</Button>
              <Button variant="outline" size="icon" className="border-accent text-accent hover:bg-accent hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
