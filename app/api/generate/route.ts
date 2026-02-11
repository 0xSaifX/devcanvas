import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Optimized prompts for each framework
const PROMPTS = {
  react: `You are an expert React developer. Analyze this UI screenshot and generate a production-ready React component.

REQUIREMENTS:
- Use functional components with hooks
- Include proper TypeScript types
- Use Tailwind CSS for styling (utility classes only)
- Make it responsive (mobile-first approach)
- Use semantic HTML elements
- Include proper accessibility attributes
- Add helpful comments for complex logic
- Follow React best practices

OUTPUT FORMAT:
- Return ONLY the component code, no explanations
- Start with imports
- Export as default
- Use descriptive variable/component names
- Keep it clean and maintainable

Generate the React component now:`,

  vue: `You are an expert Vue developer. Analyze this UI screenshot and generate a production-ready Vue 3 component.

REQUIREMENTS:
- Use Vue 3 Composition API with <script setup>
- Include proper TypeScript types
- Use Tailwind CSS for styling (utility classes only)
- Make it responsive (mobile-first approach)
- Use semantic HTML elements
- Include proper accessibility attributes
- Follow Vue 3 best practices

OUTPUT FORMAT:
- Return ONLY the component code, no explanations
- Use proper SFC structure (template, script, style)
- Use descriptive variable/component names
- Keep it clean and maintainable

Generate the Vue component now:`,

  html: `You are an expert frontend developer. Analyze this UI screenshot and generate production-ready HTML with Tailwind CSS.

REQUIREMENTS:
- Use semantic HTML5 elements
- Use Tailwind CSS for styling (utility classes only)
- Make it responsive (mobile-first approach)
- Include proper accessibility attributes
- Add meta viewport for mobile
- Keep markup clean and organized
- Include helpful comments

OUTPUT FORMAT:
- Return ONLY the HTML code, no explanations
- Include necessary Tailwind CDN link in head
- Use proper document structure
- Keep it clean and maintainable

Generate the HTML now:`,
};

type Framework = keyof typeof PROMPTS;

// Helper function to extract base64 image data
function extractBase64Image(dataUrl: string): { type: string; data: string } {
  const matches = dataUrl.match(/^data:image\/([a-zA-Z]*);base64,(.*)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid data URL");
  }
  return {
    type: matches[1],
    data: matches[2],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, framework } = body;

    if (!image || !framework) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!(framework in PROMPTS)) {
      return NextResponse.json(
        { error: "Invalid framework. Use react, vue, or html." },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Extract base64 image
    const { type, data } = extractBase64Image(image);

    // Call Claude API with vision
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: `image/${type}`,
                data: data,
              },
            },
            {
              type: "text",
              text: PROMPTS[framework as Framework],
            },
          ],
        },
      ],
    });

    // Extract generated code from response
    const generatedCode = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("\n");

    // Clean up the code (remove markdown code blocks if present)
    let cleanCode = generatedCode.trim();
    cleanCode = cleanCode.replace(/^```(?:jsx|tsx|vue|html)?\n/, "");
    cleanCode = cleanCode.replace(/\n```$/, "");

    return NextResponse.json({ code: cleanCode.trim() });
  } catch (error: unknown) {
    console.error("Error generating code:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate code";
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as { status?: unknown }).status === "number"
        ? (error as { status: number }).status
        : 500;

    return NextResponse.json(
      { error: errorMessage },
      { status }
    );
  }
}
