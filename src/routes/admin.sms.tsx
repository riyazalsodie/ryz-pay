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
  faMobileAndroid,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/admin/sms")({
  component: AdminSmsData,
});

interface SmsData {
  id: string;
  device: string;
  paymentMethod: string;
  type: string;
  phoneNumber: string;
  transactionId: string;
  amount: number;
  balance: number;
  status: string;
  createdAt: string;
}

function AdminSmsData() {
  const [smsData, setSmsData] = useState<SmsData[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 10;

  useEffect(() => {
    async function fetchSmsData() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3201";
        const response = await fetch(`${apiUrl}/api/admin/sms-data`);
        const data = await response.json();
        setSmsData(data.smsData || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Failed to fetch SMS data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSmsData();
  }, [page, filter]);

  const filteredSmsData = smsData.filter(
    (sms) =>
      sms.device?.toLowerCase().includes(search.toLowerCase()) ||
      sms.phoneNumber?.includes(search) ||
      sms.transactionId?.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-green-500/20 text-green-400 border-green-500/30",
      "awaiting review":
        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      used: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      trashed: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      styles[status.toLowerCase()] ||
      "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
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
        <div>
          <h1 className="text-2xl font-bold text-white">SMS Datas List</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your SMS data</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
            <FontAwesomeIcon icon={faMobileAndroid} className="w-4 h-4" />
            Connect Android App
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            New SMS Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
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
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "approved"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("awaiting review")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "awaiting review"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Awaiting review
        </button>
        <button
          onClick={() => setFilter("used")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "used"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Used
        </button>
        <button
          onClick={() => setFilter("trashed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "trashed"
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Trashed
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-gray-600"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Device</th>
                <th className="px-6 py-4 font-medium">Payment Method</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Phone Number</th>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Balance</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredSmsData.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FontAwesomeIcon
                        icon={faComment}
                        className="w-8 h-8 text-gray-600"
                      />
                      <p>No SMS Datas</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSmsData.map((sms) => (
                  <tr
                    key={sms.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {sms.device || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {sms.paymentMethod || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {sms.type || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {sms.phoneNumber || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                      {sms.transactionId || "-"}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      ৳{sms.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      ৳{sms.balance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          sms.status,
                        )}`}
                      >
                        {sms.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
