import { useNavigate } from "@tanstack/react-router";
import { Bell, ExternalLink, LogOut, User } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useAuth } from "../hooks/useAuth";

interface AdminTopbarProps {
  title: string;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-[#E8DFD0] shadow-sm flex items-center justify-between px-8 z-40">
      {/* Left - Page Title */}
      <h1 className="font-display text-xl font-bold text-[#2C1A0E]">{title}</h1>

      {/* Right - User Menu */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative text-muted-foreground hover:text-amber-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-600 rounded-full"></span>
        </button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback className="bg-amber-400 text-[#2C1A0E] font-bold">
                  {user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <p className="text-xs font-medium text-charcoal">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-xs">
              <User className="h-4 w-4 mr-2" />
              Profil Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open("/", "_blank")} className="text-xs">
              <ExternalLink className="h-4 w-4 mr-2" />
              Lihat Website
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-xs text-red-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
