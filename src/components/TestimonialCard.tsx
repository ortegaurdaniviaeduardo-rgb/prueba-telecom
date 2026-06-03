import { Testimonial } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full bg-white rounded-3xl border-0 shadow-[0_4px_20px_-4px_rgba(27,24,87,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(27,24,87,0.1)] transition-all duration-300 overflow-hidden flex flex-col group p-4">
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-0 flex flex-row items-center justify-between mt-auto">
        <h3 className="font-bold text-[#1B1857] text-lg leading-none">{testimonial.name}</h3>
        <div className="flex text-[#FF7043] shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? "fill-current" : "text-slate-200 fill-slate-200"}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
