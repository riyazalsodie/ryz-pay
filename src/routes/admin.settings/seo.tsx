import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faShareNodes,
  faSave,
  faPlus,
  faXmark,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings/seo")({
  component: SeoSettings,
});

function SeoSettings() {
  const [formData, setFormData] = useState({
    metaDescription: "",
    seoKeywords: [] as string[],
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [ogImage, setOgImage] = useState<File | null>(null);
  const [ogPreview, setOgPreview] = useState<string | null>(null);
  const [twitterImage, setTwitterImage] = useState<File | null>(null);
  const [twitterPreview, setTwitterPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const ogInputRef = useRef<HTMLInputElement>(null);
  const twitterInputRef = useRef<HTMLInputElement>(null);

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (!trimmed) return;

    // Support comma-separated input
    const newKeywords = trimmed
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k && !formData.seoKeywords.includes(k));

    if (newKeywords.length > 0) {
      setFormData({
        ...formData,
        seoKeywords: [...formData.seoKeywords, ...newKeywords],
      });
    }
    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      seoKeywords: formData.seoKeywords.filter((k) => k !== keyword),
    });
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "og" | "twitter",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (type === "og") {
        setOgImage(file);
        setOgPreview(ev.target?.result as string);
      } else {
        setTwitterImage(file);
        setTwitterPreview(ev.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: "og" | "twitter") => {
    if (type === "og") {
      setOgImage(null);
      setOgPreview(null);
      if (ogInputRef.current) ogInputRef.current.value = "";
    } else {
      setTwitterImage(null);
      setTwitterPreview(null);
      if (twitterInputRef.current) twitterInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("SEO settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/settings"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">SEO Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Search Engine Optimization — Improve your visibility in search
            engines
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta Description */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />
            Search Engine Optimization
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Improve your visibility in search engines
          </p>

          <div className="space-y-6">
            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                rows={3}
                maxLength={160}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600 resize-none"
                placeholder="Enter a compelling description of your business that will appear in search results"
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  This appears in search engine results below your site title
                </p>
                <span
                  className={`text-xs ${formData.metaDescription.length > 150 ? "text-amber-400" : "text-gray-500"}`}
                >
                  {formData.metaDescription.length}/160
                </span>
              </div>
            </div>

            {/* SEO Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SEO Keywords
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600"
                  placeholder="Enter a keyword and press Enter"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-white/20 transition-colors text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />
                  Add keyword
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Keywords that represent your business (comma separated)
              </p>

              {/* Keywords Tags */}
              {formData.seoKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.seoKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/10 rounded-full text-sm text-white group"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="w-3 h-3"
                        />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Sharing */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faShareNodes} className="w-5 h-5" />
            Social Media Sharing
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Customize how your content appears when shared on social platforms
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook / LinkedIn OG Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facebook / LinkedIn Image
              </label>
              {ogPreview ? (
                <div className="relative group rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={ogPreview}
                    alt="OG Preview"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => ogInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white/20 rounded-lg text-sm text-white hover:bg-white/30 transition-colors"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage("og")}
                      className="px-3 py-1.5 bg-red-500/30 rounded-lg text-sm text-white hover:bg-red-500/50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => ogInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-300 hover:border-white/20 transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faImage} className="w-8 h-8" />
                  <span className="text-sm">Click to upload</span>
                </button>
              )}
              <input
                ref={ogInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "og")}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">
                Recommended size: 1200×630 pixels
              </p>
            </div>

            {/* Twitter / X Card Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter / X Card Image
              </label>
              {twitterPreview ? (
                <div className="relative group rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={twitterPreview}
                    alt="Twitter Preview"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => twitterInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white/20 rounded-lg text-sm text-white hover:bg-white/30 transition-colors"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage("twitter")}
                      className="px-3 py-1.5 bg-red-500/30 rounded-lg text-sm text-white hover:bg-red-500/50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => twitterInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-300 hover:border-white/20 transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faImage} className="w-8 h-8" />
                  <span className="text-sm">Click to upload</span>
                </button>
              )}
              <input
                ref={twitterInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "twitter")}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">
                Recommended size: 1200×628 pixels
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <FontAwesomeIcon
              icon={faSave}
              className={`w-4 h-4 ${saving ? "animate-pulse" : ""}`}
            />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
