import Image from "next/image";
import { GALLERY } from "@/lib/media";
import Reveal from "./Reveal";

export default function GalleryShowcase() {
  return (
    <div className="grid auto-rows-[180px] gap-4 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-4">
      {GALLERY.map((g, i) => (
        <Reveal
          key={g.src}
          delay={i * 90}
          direction="zoom"
          className={i === 0 ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2" : ""}
        >
          <div className="image-zoom group relative h-full w-full overflow-hidden rounded-3xl border border-white/60 shadow-lg">
            <Image
              src={g.src}
              alt={g.caption}
              fill
              sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-1 p-5 text-white transition-transform duration-500 group-hover:translate-y-0">
              <p className="text-sm font-black sm:text-base">{g.title}</p>
              <p className="mt-0.5 text-xs text-white/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{g.caption}</p>
            </div>
            <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/20 text-xs text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">↗</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
