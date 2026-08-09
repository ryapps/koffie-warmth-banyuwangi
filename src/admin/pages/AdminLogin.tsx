import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../hooks/useAuth";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = login(email, password);
      if (result.success) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(result.error || "Login gagal");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-[#2C1A0E] text-cream flex-col justify-center items-center p-12">
        <div className="max-w-md text-center">
          <h1 className="font-display text-5xl font-bold mb-4">KOFFIE</h1>
          <p className="text-xl font-light italic text-amber-400 mb-8">café</p>
          <p className="text-lg mb-12 leading-relaxed">
            Kelola semua konten website kafe Anda tanpa perlu coding.
          </p>
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              Kelola menu makanan & minuman
            </p>
            <p className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              Atur acara dan workshop
            </p>
            <p className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              Kelola galeri foto
            </p>
            <p className="flex items-center gap-2">
              <span className="text-amber-400">✓</span>
              Lihat reservasi pelanggan
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-[#F5F0E8]">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:hidden">
            <h1 className="font-display text-4xl font-bold text-[#2C1A0E]">KOFFIE</h1>
            <p className="text-sm font-light italic text-amber-600">Panel Admin</p>
          </div>

          <h2 className="text-2xl font-display font-bold text-[#2C1A0E] mb-2">Selamat Datang</h2>
          <p className="text-sm text-muted-foreground mb-8">Masuk ke panel admin KOFFIE Café</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-amber-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@koffie.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-[#E8DFD0] text-charcoal placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-amber-600" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border-[#E8DFD0] text-charcoal"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-amber-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#2C1A0E] text-cream hover:bg-amber-600 font-display tracking-widest"
            >
              {isLoading ? "MEMPROSES..." : "MASUK KE PANEL"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-medium text-amber-900 mb-2">Kredensial Demo:</p>
            <p className="text-xs text-amber-800">
              <strong>Email:</strong> admin@koffie.id
            </p>
            <p className="text-xs text-amber-800">
              <strong>Password:</strong> koffie2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
