import { FloatingActionBar } from "@/components/layout/FloatingActionBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { MenuSection } from "@/components/sections/MenuSection";
import { OurSpaceSection } from "@/components/sections/OurSpaceSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { ReservationModal } from "@/components/ui/ReservationModal";
import {
  EventsSection,
  FindUsSection,
  NewsletterSection,
  PrivateHireSection,
  TestimonialsSection,
} from "@/components/sections/RemainingSections";
import { createFileRoute } from "@tanstack/react-router";

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
      <ReservationModal />
      <HeroSection />
      <MarqueeBar />
      <PhilosophySection />
      <MenuSection />
      <OurSpaceSection />
      <EventsSection />
      <ReservationSection />
      <PrivateHireSection />
      <TestimonialsSection />
      <FindUsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

