import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faGear,
  faImage,
  faKey,
  faPalette,
  faCircleQuestion,
  faMagnifyingGlass as faSearch,
  faFileLines,
  faBox,
  faBolt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/admin/settings/_index")({
  component: AdminSettings,
});

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  link: string;
}

function AdminSettings() {
  const [search, setSearch] = useState("");

  const settingsItems: SettingItem[] = [
    {
      id: "general",
      title: "General",
      description: "Configure the fundamental information of the brand",
      icon: faGear,
      link: "/admin/settings/general",
    },
    {
      id: "logo",
      title: "Logo & Favicon",
      description: "Upload and manage website logo and favicon",
      icon: faImage,
      link: "/admin/settings/logo",
    },
    {
      id: "api",
      title: "API Settings",
      description: "Configure API credentials, tokens and permissions",
      icon: faKey,
      link: "/admin/settings/api",
    },
    {
      id: "themes",
      title: "Themes",
      description: "Browse, activate, and customize your checkout themes",
      icon: faPalette,
      link: "/admin/settings/themes",
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Manage frequently asked questions and categories",
      icon: faCircleQuestion,
      link: "/admin/settings/faq",
    },
    {
      id: "seo",
      title: "SEO",
      description: "Configure meta tags, sitemap and search engine settings",
      icon: faSearch,
      link: "/admin/settings/seo",
    },
    {
      id: "text-file",
      title: "Text File",
      description: "Manage and upload text-based files",
      icon: faFileLines,
      link: "/admin/settings/text-file",
    },
    {
      id: "orderbox",
      title: "Orderbox (ResellerClub)",
      description:
        "The Best-in-Class Domains & Web Products Automation Platform",
      icon: faBox,
      link: "/admin/settings/orderbox",
    },
    {
      id: "liquid",
      title: "Liquid (ResellerCamp)",
      description:
        "The advanced in-house software for DNS & domain names management",
      icon: faBolt,
      link: "/admin/settings/liquid",
    },
  ];

  const filteredItems = settingsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">All Settings</h1>
        <p className="text-gray-400">
          Adjust and fine-tune all system features and preferences
        </p>
      </div>

      <div className="relative max-w-md">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search settings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <FontAwesomeIcon
              icon={faGear}
              className="w-12 h-12 mb-4 text-gray-600"
            />
            <p>No settings found</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-5 h-5 text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
