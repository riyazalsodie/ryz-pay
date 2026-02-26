import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faPencil,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faLink,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/admin/links")({
  component: AdminPaymentLinks,
});

interface PaymentLink {
  id: string;
  productName: string;
  productDescription: string;
  amount: number;
  currency: string;
  quantity: number;
  status: string;
  createdAt: string;
}

function AdminPaymentLinks() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 10;

  useEffect(() => {
    async function fetchLinks() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3201";
        const response = await fetch(`${apiUrl}/api/admin/payment-links`);
        const data = await response.json();
        setLinks(data.links || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Failed to fetch payment links:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, [page, filter]);

  const filteredLinks = links.filter(
    (link) =>
      link.productName?.toLowerCase().includes(search.toLowerCase()) ||
      link.productDescription?.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      expired: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      styles[status.toLowerCase()] ||
      "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Payment Links</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 w-64 placeholder:text-gray-600"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            New payment link
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "active"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("inactive")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "inactive"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Inactive
        </button>
        <button
          onClick={() => setFilter("expired")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "expired"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Expired
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Product name</th>
                <th className="px-6 py-4 font-medium">Product description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredLinks.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLink}
                        className="w-8 h-8 text-gray-600"
                      />
                      <p>No payment links</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLinks.map((link) => (
                  <tr
                    key={link.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {link.productName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {link.productDescription || "-"}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {link.currency} {link.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{link.quantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          link.status,
                        )}`}
                      >
                        {link.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="w-4 h-4"
                          />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors">
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {(page - 1) * perPage + 1} to{" "}
            {Math.min(page * perPage, total)} of {total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * perPage >= total}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
            <select className="ml-4 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
              <option value="10">Per page</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
