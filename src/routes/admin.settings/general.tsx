import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faMoneyBillWave,
  faLanguage,
  faChartLine,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/admin/settings/general")({
  component: GeneralSettings,
});

function GeneralSettings() {
  const [formData, setFormData] = useState({
    siteName: "RyzPay",
    timezone: "Asia/Dhaka",
    currency: "BDT",
    currencySymbol: "৳",
    language: "bn",
    weekStartsOn: "saturday",
    gtmId: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully!");
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
          <h1 className="text-2xl font-bold text-white">General Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure the core settings for your application
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
            Basic Information
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Configure the core settings for your application
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) =>
                  setFormData({ ...formData, siteName: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600"
                placeholder="Enter site name"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will appear in the browser title and various places
                throughout the application
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Timezone <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.timezone}
                onChange={(e) =>
                  setFormData({ ...formData, timezone: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
              >
                <option value="Asia/Dhaka">(UTC+06:00) Asia/Dhaka</option>
                <option value="UTC">(UTC+00:00) UTC</option>
                <option value="America/New_York">
                  (UTC-05:00) America/New York
                </option>
                <option value="Europe/London">(UTC+00:00) Europe/London</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                All dates and times will be displayed according to this timezone
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faMoneyBillWave} className="w-5 h-5" />
            Currency & Financial
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Configure currency settings
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Currency <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
              >
                <option value="BDT">BDT - Bangladeshi Taka</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Currency used for all financial transactions
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Currency Symbol
              </label>
              <input
                type="text"
                value={formData.currencySymbol}
                onChange={(e) =>
                  setFormData({ ...formData, currencySymbol: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600"
                placeholder="৳"
              />
              <p className="text-xs text-gray-500 mt-1">
                Automatically set based on selected currency
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faLanguage} className="w-5 h-5" />
            Localization
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Configure language and date format preferences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Language <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
              >
                <option value="bn">Bangla</option>
                <option value="en">English</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Checkout interface language
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Week Starts On <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.weekStartsOn}
                onChange={(e) =>
                  setFormData({ ...formData, weekStartsOn: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
              >
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Determines first day of week in reports
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
            Analytics & Tracking
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Set up tools to monitor traffic and user behavior
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Tag Manager ID
            </label>
            <input
              type="text"
              value={formData.gtmId}
              onChange={(e) =>
                setFormData({ ...formData, gtmId: e.target.value })
              }
              className="w-full md:w-1/2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600"
              placeholder="GTM-XXXXXXX"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your unique Google Tag Manager container ID
            </p>
          </div>
        </div>

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
