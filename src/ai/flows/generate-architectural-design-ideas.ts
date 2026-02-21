'use server';
/**
 * @fileOverview A Genkit flow for generating architectural design ideas based on user inputs.
 *
 * - generateArchitecturalDesignIdeas - A function that handles the architectural design idea generation process.
 * - GenerateArchitecturalDesignIdeasInput - The input type for the generateArchitecturalDesignIdeas function.
 * - GenerateArchitecturalDesignIdeasOutput - The return type for the generateArchitecturalDesignIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArchitecturalDesignIdeasInputSchema = z.object({
  location: z
    .string()
    .describe(
      'The geographical location or setting for the design (e.g., coastal California, urban Tokyo).'
    ),
  materials: z
    .array(z.string())
    .describe(
      'A list of preferred building materials (e.g., wood, glass, concrete).'+
      'Each material should be a string.'
    ),
  style: z
    .string()
    .describe(
      'The desired architectural style (e.g., modern, minimalist, rustic, art deco).' 
    ),
  filters: z
    .array(z.string())
    .optional()
    .describe('Optional filters or constraints for the design (e.g., sustainable, open-plan, small footprint).'),
  specifications: z
    .array(z.string())
    .optional()
    .describe(
      'Optional additional specifications or features (e.g., large windows, rooftop garden, home office).' 
    ),
});
export type GenerateArchitecturalDesignIdeasInput = z.infer<typeof GenerateArchitecturalDesignIdeasInputSchema>;

const DesignIdeaSchema = z.object({
  title: z.string().describe('A catchy title for the architectural design idea.'),
  description: z
    .string()
    .describe('A detailed description of the architectural concept, features, and rationale.'),
  keyFeatures: z
    .array(z.string())
    .describe('A list of bullet points highlighting the main features of the design.'),
  moodBoardDescription: z
    .string()
    .describe(
      'A concise description suitable for an image generation model to create a conceptual mood board or initial rendering for this design idea.'
    ),
});

const GenerateArchitecturalDesignIdeasOutputSchema = z.object({
  designIdeas: z
    .array(DesignIdeaSchema)
    .describe('An array of generated architectural design ideas.'),
});
export type GenerateArchitecturalDesignIdeasOutput = z.infer<typeof GenerateArchitecturalDesignIdeasOutputSchema>;

export async function generateArchitecturalDesignIdeas(
  input: GenerateArchitecturalDesignIdeasInput
): Promise<GenerateArchitecturalDesignIdeasOutput> {
  return generateArchitecturalDesignIdeasFlow(input);
}

const architecturalDesignPrompt = ai.definePrompt({
  name: 'architecturalDesignPrompt',
  input: {schema: GenerateArchitecturalDesignIdeasInputSchema},
  output: {schema: GenerateArchitecturalDesignIdeasOutputSchema},
  prompt: `You are an expert architectural designer with a deep understanding of various styles, materials, and sustainable practices. Your task is to generate unique and inspiring architectural design ideas based on the user's requirements.

Generate multiple distinct design ideas (at least 3, up to 5) that fit the following criteria:

Location: {{{location}}}
Preferred Materials: {{#each materials}}- {{{this}}}\n{{/each}}
Architectural Style: {{{style}}}

{{#if filters}}
Additional Filters/Constraints:
{{#each filters}}- {{{this}}}\n{{/each}}
{{/if}}

{{#if specifications}}
Specific Features/Specifications:
{{#each specifications}}- {{{this}}}\n{{/each}}
{{/if}}

For each design idea, provide:
1. A catchy title.
2. A detailed description of the architectural concept, including its connection to the location, material usage, and style. Elaborate on the design philosophy and how it addresses potential challenges or opportunities.
3. A list of key features in bullet points.
4. A concise, one-sentence description suitable for generating a conceptual mood board or initial rendering (e.g., 'A modern minimalist house with large glass panels overlooking the ocean, featuring natural wood accents and a green roof.').`,
});

const generateArchitecturalDesignIdeasFlow = ai.defineFlow(
  {
    name: 'generateArchitecturalDesignIdeasFlow',
    inputSchema: GenerateArchitecturalDesignIdeasInputSchema,
    outputSchema: GenerateArchitecturalDesignIdeasOutputSchema,
  },
  async input => {
    const {output} = await architecturalDesignPrompt(input);
    return output!;
  }
);
