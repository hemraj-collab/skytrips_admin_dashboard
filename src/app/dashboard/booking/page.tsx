"use client";

import { useState, useEffect } from "react";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  Booking,
} from "@/lib/api/bookings";
import BookingModal from "./BookingModal";

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, [currentPage, pageSize]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    console.log("Fetching bookings for page", currentPage, "with limit", pageSize);
    const { data, totalCount: count, error: fetchError } = await getBookings(currentPage, pageSize);

    if (fetchError) {
      setError(fetchError);
    } else {
      setBookings(data || []);
      setTotalCount(count);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCreate = () => {
    setEditingBooking(null);
    setIsModalOpen(true);
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    setActionLoading(id);
    const { error: deleteError } = await deleteBooking(id);

    if (deleteError) {
      alert(deleteError);
    } else {
      await fetchBookings();
    }
    setActionLoading(null);
  };

  const handleSave = async (booking: Booking) => {
    setActionLoading(-1);

    if (editingBooking?.id) {
      // Update
      const { error: updateError } = await updateBooking(
        editingBooking.id,
        booking
      );
      if (updateError) {
        alert(updateError);
        setActionLoading(null);
        return;
      }
    } else {
      // Create
      const { error: createError } = await createBooking(booking);
      if (createError) {
        alert(createError);
        setActionLoading(null);
        return;
      }
    }

    setIsModalOpen(false);
    setActionLoading(null);
    await fetchBookings();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500";
      case "pending":
        return "bg-amber-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full font-display">
      {/* Breadcrumbs */}
      <nav className="flex mb-4 text-sm text-slate-500">
        <ol className="flex items-center gap-2">
          <li>Dashboard</li>
          <li>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </li>
          <li className="font-medium text-primary">Bookings</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bookings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track all customer flight reservations.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Booking</span>
        </button>
      </div>

      {/* Filters and Search Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Search by Booking ID, Name or Route"
            type="text"
          />
        </div>
        <div className="flex gap-4">
          <select className="w-full sm:w-48 rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary">
            <option value="">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[400px]">
        {bookings.length === 0 ? (
          <div className="flex-1 p-12 text-center flex flex-col items-center justify-center">
            <p className="text-slate-500 text-lg mb-4 font-display">
              No bookings found
            </p>
            <button
              onClick={handleCreate}
              className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Create Your First Booking
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">S.N</th>
                  <th className="px-6 py-4">Passenger</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Trip Type</th>
                  <th className="px-6 py-4">PNR</th>
                  <th className="px-6 py-4">Travel Date</th>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-9 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url("https://ui-avatars.com/api/?name=${encodeURIComponent(
                              `${booking.travellerFirstName} ${booking.travellerLastName}`
                            )}&background=random")`,
                          }}
                        ></div>
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-medium text-sm">
                            {booking.travellerFirstName} {booking.travellerLastName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-900 font-semibold">
                        {booking.buyingPrice}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">
                        {booking.tripType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-primary px-2 py-1 rounded text-xs font-bold">
                        {booking.PNR}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-900">
                        {booking.IssueDay} {booking.issueMonth} {booking.issueYear}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                        <span className="text-slate-600 font-bold">{booking.origin}</span>
                        <span className="material-symbols-outlined text-xs text-slate-400">arrow_forward</span>
                        {booking.transit && (
                          <>
                            <span className="text-slate-600 font-bold">{booking.transit}</span>
                            <span className="material-symbols-outlined text-xs text-slate-400">arrow_forward</span>
                          </>
                        )}
                        <span className="text-slate-600 font-bold">{booking.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-primary"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id!)}
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4 bg-white">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-500 font-display">
                Showing{" "}
                <span className="font-medium text-slate-900">
                  {totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-slate-900">
                  {Math.min(currentPage * pageSize, totalCount)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-900">
                  {totalCount}
                </span>{" "}
                results
              </p>
              <div className="hidden sm:flex items-center gap-2 ml-4 border-l border-slate-100 pl-4">
                <span className="text-xs text-slate-500">Rows per page:</span>
                <select 
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || loading}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                
                <div className="flex items-center px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-100">
                  Page <span className="mx-1 font-bold text-primary">{currentPage}</span> of {totalPages || 1}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0 || loading}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        booking={editingBooking}
        isLoading={actionLoading === -1}
      />
    </div>
  );
}

