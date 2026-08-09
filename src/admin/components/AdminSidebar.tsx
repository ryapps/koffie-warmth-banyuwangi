import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  ClipboardList,
  Home,
  Image,
  LogOut,
  Megaphone,
  Settings,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import React from "react";
import { Separator } from "../../components/ui/separator";
import { useAuth } from "../hooks/useAuth";

interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href: string;
  category: "content" | "appearance" | "settings";
}

const links: SidebarLink[] = [
  {
    label: "Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/admin/dashboard",
    category: "content",
  },
  {
    label: "Kelola Menu",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    href: "/admin/menu",
    category: "content",
  },
  {
    label: "Kelola Acara",
    icon: <Calendar className="h-5 w-5" />,
    href: "/admin/events",
    category: "content",
  },
  {
    label: "Galeri Foto",
    icon: <Image className="h-5 w-5" />,
    href: "/admin/gallery",
    category: "content",
  },
  {
    label: "Ulasan Tamu",
    icon: <Star className="h-5 w-5" />,
    href: "/admin/testimonials",
    category: "content",
  },
  {
    label: "Reservasi",
    icon: <ClipboardList className="h-5 w-5" />,
    href: "/admin/reservations",
    category: "content",
  },
  {
    label: "Konten Hero",
    icon: <Home className="h-5 w-5" />,
    href: "/admin/hero",
    category: "appearance",
  },
  {
    label: "Teks Marquee",
    icon: <Megaphone className="h-5 w-5" />,
    href: "/admin/marquee",
    category: "appearance",
  },
  {
    label: "Pengaturan",
    icon: <Settings className="h-5 w-5" />,
    href: "/admin/settings",
    category: "settings",
  },
];

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  const contentLinks = links.filter((link) => link.category === "content");
  const appearanceLinks = links.filter((link) => link.category === "appearance");
  const settingsLinks = links.filter((link) => link.category === "settings");

  const SidebarLinkItem: React.FC<{ link: SidebarLink }> = ({ link }) => {
    const isActive = location.pathname === link.href;

    return (
      <button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={() => navigate({ to: link.href as any })}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all border-r-2 ${
          isActive
            ? "bg-amber-400/10 text-amber-400 border-amber-400"
            : "text-cream/60 hover:text-cream hover:bg-cream/5 border-transparent"
        }`}
      >
        {link.icon}
        {link.label}
        {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
      </button>
    );
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1A0F07] border-r border-[#2C1A0E] flex flex-col overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 border-b border-[#2C1A0E]">
        <h1 className="font-display text-3xl font-bold text-cream">KOFFIE</h1>
        <p className="text-xs font-light italic text-amber-400">café</p>
        <p className="text-[10px] text-cream/40 mt-2 tracking-wider uppercase">Panel Admin</p>
        <div className="mt-3 h-0.5 w-8 bg-gradient-to-r from-amber-400 to-transparent"></div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 overflow-y-auto">
        {/* Konten Website */}
        <div>
          <p className="px-4 text-[10px] font-bold text-cream/50 uppercase tracking-wider mb-3">
            Konten Website
          </p>
          <div className="space-y-1">
            {contentLinks.map((link) => (
              <SidebarLinkItem key={link.href} link={link} />
            ))}
          </div>
        </div>

        <Separator className="my-4 bg-[#2C1A0E]" />

        {/* Pengaturan Tampilan */}
        <div>
          <p className="px-4 text-[10px] font-bold text-cream/50 uppercase tracking-wider mb-3">
            Pengaturan Tampilan
          </p>
          <div className="space-y-1">
            {appearanceLinks.map((link) => (
              <SidebarLinkItem key={link.href} link={link} />
            ))}
          </div>
        </div>

        <Separator className="my-4 bg-[#2C1A0E]" />

        {/* Pengaturan Kafe */}
        <div>
          <p className="px-4 text-[10px] font-bold text-cream/50 uppercase tracking-wider mb-3">
            Pengaturan Kafe
          </p>
          <div className="space-y-1">
            {settingsLinks.map((link) => (
              <SidebarLinkItem key={link.href} link={link} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#2C1A0E] p-4">
        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-cream/5">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#1A0F07] text-xs font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 text-xs">
            <p className="text-cream font-medium">{user?.name}</p>
            <p className="text-cream/50">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-cream/60 hover:text-amber-400 hover:bg-cream/5 rounded-lg transition-all font-medium"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
};
