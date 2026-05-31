import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionBar } from "@/components/layout/FloatingActionBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { MenuSection } from "@/components/sections/MenuSection";
import { OurSpaceSection } from "@/components/sections/OurSpaceSection";
import {
  EventsSection,
  PrivateHireSection,
  TestimonialsSection,
  FindUsSection,
  NewsletterSection,
} from "@/components/sections/RemainingSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KOFFIE café — Kopi Artisan di Banyuwangi" },
      {
        name: "description",
        content:
          "Kopi diseduh perlahan, pastri segar, dan suasana hangat di jantung Banyuwangi. Datang apa adanya, berlama-lama sesukamu.",
      },
      { property: "og:title", content: "KOFFIE café — Kopi Artisan di Banyuwangi" },
      {
        property: "og:description",
        content: "Kopi diseduh perlahan dan suasana hangat di Banyuwangi.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />
      <FloatingActionBar />
      <HeroSection />
      <MarqueeBar />
      <PhilosophySection />
      <MenuSection />
      <OurSpaceSection />
      <EventsSection />
      <PrivateHireSection />
      <TestimonialsSection />
      <FindUsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
