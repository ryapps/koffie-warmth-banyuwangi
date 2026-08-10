import { Plus, Trash2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useMarqueeStore, MarqueeSettings } from "../../store/useMarqueeStore";
import { AdminLayout } from "../components/AdminLayout";

export const AdminMarquee = () => {
  const { settings, updateSettings } = useMarqueeStore();

  const [items, setItems] = useState<string[]>(settings.items);
  const [speed, setSpeed] = useState<MarqueeSettings["speed"]>(settings.speed);
  const [bgColor, setBgColor] = useState<string>(settings.backgroundColor);
  const [textColor, setTextColor] = useState<string>(settings.textColor);

  useEffect(() => {
    setItems(settings.items);
    setSpeed(settings.speed);
    setBgColor(settings.backgroundColor);
    setTextColor(settings.textColor);
  }, [settings]);

  const handleItemChange = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, "Teks Marquee Baru"]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      toast.error("Minimal harus ada 1 item marquee.");
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSave = () => {
    const filteredItems = items.map((i) => i.trim()).filter(Boolean);
    if (filteredItems.length === 0) {
      toast.error("Item marquee tidak boleh kosong.");
      return;
    }

    updateSettings({
      items: filteredItems,
      speed,
      backgroundColor: bgColor,
      textColor,
    });

    toast.success("Pengaturan Marquee berhasil disimpan!");
  };

  const previewSpeedDuration =
    speed === "slow" ? "40s" : speed === "fast" ? "15s" : "25s";

  return (
    <AdminLayout title="Edit Teks Marquee">
      <div className="max-w-2xl space-y-6">
        {/* Live Preview */}
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Pratinjau Langsung
          </label>
          <div
            className="p-4 rounded-lg overflow-hidden border border-espresso/10 transition-colors duration-300"
            style={{ backgroundColor: bgColor }}
          >
            <div
              className="flex gap-12 whitespace-nowrap animate-marquee"
              style={{ animationDuration: previewSpeedDuration }}
            >
              {[...items, ...items].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-12 text-xs tracking-[0.3em] font-body uppercase font-medium"
                  style={{ color: textColor }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ backgroundColor: textColor }}
                  />
                  <span>{item || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-charcoal mb-4">Daftar Item Marquee</h3>

          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#F5F0E8] rounded-lg">
              <span className="text-[#A39282] font-mono text-xs w-5 text-center">{i + 1}</span>
              <Input
                value={item}
                onChange={(e) => handleItemChange(i, e.target.value)}
                placeholder="Tulis teks marquee..."
                className="border-[#E8DFD0] bg-white text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(i)}
                className="p-2 hover:bg-red-100 rounded text-red-600 transition-colors"
                title="Hapus Item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddItem}
            className="w-full mt-4 border-dashed border-[#C8852A] text-[#C8852A] hover:bg-amber-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Item
          </Button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-charcoal">Pengaturan Tampilan</h3>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Kecepatan Scroll
            </label>
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value as MarqueeSettings["speed"])}
              className="w-full border border-[#E8DFD0] rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="slow">Lambat (40s)</option>
              <option value="normal">Normal (25s)</option>
              <option value="fast">Cepat (15s)</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Warna Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 rounded-md cursor-pointer border border-[#E8DFD0] p-1"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="border-[#E8DFD0] text-sm uppercase font-mono"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Warna Teks
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-10 rounded-md cursor-pointer border border-[#E8DFD0] p-1"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="border-[#E8DFD0] text-sm uppercase font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-amber-600 text-white hover:bg-amber-700 font-semibold py-3 flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Simpan Pengaturan Marquee
        </Button>
      </div>
    </AdminLayout>
  );
};

