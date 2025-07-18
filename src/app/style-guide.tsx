import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const colors = [
  { name: "Sky Blue (Background)", var: "--background" },
  { name: "Lake Blue (Primary)", var: "--primary" },
  { name: "Grass Green (Secondary)", var: "--secondary" },
  { name: "Tent Green (Accent)", var: "--accent" },
  { name: "Earthy Beige (Card)", var: "--card" },
];

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 gap-12">
      <h1 className="text-4xl font-extrabold mb-2 text-green-800">Style Guide</h1>
      <p className="text-lg text-center max-w-2xl mb-8">This page showcases the nature-inspired color palette, typography, and UI components for CampEasy Israel. Use it as a reference for consistent, professional design.</p>
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {colors.map((color) => (
            <div key={color.var} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 rounded-full border shadow"
                style={{ background: `var(${color.var})` }}
              />
              <span className="text-sm font-medium text-center">{color.name}</span>
              <span className="text-xs text-gray-500">{color.var}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-green-800">Heading 1 - 5xl</h1>
          <h2 className="text-3xl font-bold text-green-700">Heading 2 - 3xl</h2>
          <h3 className="text-xl font-semibold text-green-600">Heading 3 - xl</h3>
          <p className="text-base text-gray-700">Body text - base</p>
          <p className="text-sm text-gray-500">Small text - sm</p>
        </div>
      </section>
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4">UI Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 flex flex-col gap-4 items-start">
            <span className="font-semibold mb-2">Button</span>
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </Card>
          <Card className="p-6 flex flex-col gap-4 items-start">
            <span className="font-semibold mb-2">Input & Label</span>
            <Label htmlFor="demo-input">Demo Input</Label>
            <Input id="demo-input" placeholder="Type here..." />
            <Label htmlFor="demo-checkbox">Demo Checkbox</Label>
            <Checkbox id="demo-checkbox" />
          </Card>
        </div>
      </section>
    </div>
  );
} 