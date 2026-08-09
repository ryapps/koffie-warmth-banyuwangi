import React from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-[#F5F0E8]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Topbar */}
        <AdminTopbar title={title} />

        {/* Content Area */}
        <main className="pt-20 pb-8 px-8 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
