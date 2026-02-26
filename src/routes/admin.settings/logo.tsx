import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faImage,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/admin/settings/logo")({
  component: LogoSettings,
});

function LogoSettings() {
  const [primaryLogo, setPrimaryLogo] = useState<string | null>(null);
  const [roundLogo, setRoundLogo] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "primary") setPrimaryLogo(url);
      if (type === "round") setRoundLogo(url);
      if (type === "favicon") setFavicon(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Logos saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/settings"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Logo & Favicon</h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure the logos used throughout your application
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
            Primary Logo
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Main logo used in header and emails
          </p>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors">
            {primaryLogo ? (
              <div className="relative inline-block">
                <img
                  src={primaryLogo}
                  alt="Primary Logo"
                  className="max-h-32 mx-auto"
                />
                <button
                  type="button"
                  onClick={() => setPrimaryLogo(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faUpload}
                  className="w-12 h-12 text-gray-500 mb-4 mx-auto"
                />
                <p className="text-gray-400 mb-2">No file chosen</p>
                <label className="cursor-pointer">
                  <span className="text-white hover:underline">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "primary")}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
            Round Logo
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Used for avatars and round logo displays
          </p>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors">
            {roundLogo ? (
              <div className="relative inline-block">
                <img
                  src={roundLogo}
                  alt="Round Logo"
                  className="max-h-32 mx-auto rounded-full"
                />
                <button
                  type="button"
                  onClick={() => setRoundLogo(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faUpload}
                  className="w-12 h-12 text-gray-500 mb-4 mx-auto"
                />
                <p className="text-gray-400 mb-2">No file chosen</p>
                <label className="cursor-pointer">
                  <span className="text-white hover:underline">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "round")}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
            Favicon
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Browser tab icon (32x32 recommended)
          </p>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors">
            {favicon ? (
              <div className="relative inline-block">
                <img src={favicon} alt="Favicon" className="max-h-16 mx-auto" />
                <button
                  type="button"
                  onClick={() => setFavicon(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faUpload}
                  className="w-12 h-12 text-gray-500 mb-4 mx-auto"
                />
                <p className="text-gray-400 mb-2">No file chosen</p>
                <label className="cursor-pointer">
                  <span className="text-white hover:underline">
                    Click to upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "favicon")}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
