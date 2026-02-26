import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCalendar,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

interface ReportData {
  label: string;
  amount: number;
  payments: number;
  successRate: number;
}

function AdminReports() {
  const [timeFilter, setTimeFilter] = useState("daily");
  const [dateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const reportData: ReportData[] = [
    { label: "Today", amount: 0, payments: 0, successRate: 0 },
    { label: "Yesterday", amount: 0, payments: 0, successRate: 0 },
    { label: "This Week", amount: 0, payments: 0, successRate: 0 },
    { label: "Last Week", amount: 0, payments: 0, successRate: 0 },
    { label: "This Month", amount: 0, payments: 0, successRate: 0 },
    { label: "Last Month", amount: 0, payments: 0, successRate: 0 },
    { label: "This Year", amount: 0, payments: 0, successRate: 0 },
    { label: "Last Year", amount: 0, payments: 0, successRate: 0 },
  ];

  const formatDateRange = () => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Reports</h1>
      </div>

      {/* Time Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          {["daily", "weekly", "monthly", "yearly"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                timeFilter === filter
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
          <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
          Custom Range
          <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
        </button>
      </div>

      {/* Financial Report */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
            Financial Report: {formatDateRange()}
          </h2>
        </div>

        {/* Report Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportData.map((report, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
            >
              <p className="text-sm font-medium text-gray-400 mb-2">
                {report.label}
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                ৳
                {report.amount.toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-gray-500">
                {report.payments} payments completed • {report.successRate}%
                success
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section - Placeholder for future */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Payment Trends
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Gateway Distribution
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No data available
          </div>
        </div>
      </div>
    </div>
  );
}
