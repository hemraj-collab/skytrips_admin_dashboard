"use client";

import { useState, useEffect } from "react";
import { Booking } from "@/types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  onEdit?: () => void;
  booking: Booking | null;
  isLoading: boolean;
  isReadOnly?: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  onSave,
  onEdit,
  booking,
  isLoading,
  isReadOnly = false,
}: BookingModalProps) {
  const [formData, setFormData] = useState<Booking>({
    travellerFirstName: "",
    travellerLastName: "",
    PNR: "",
    ticketNumber: "",
    airlines: "",
    origin: "",
    transit: "",
    destination: "",
    tripType: "Round Trip",
    issueMonth: "",
    IssueDay: "",
    issueYear: "",
    buyingPrice: "",
    payment: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    } else {
      setFormData({
        travellerFirstName: "",
        travellerLastName: "",
        PNR: "",
        ticketNumber: "",
        airlines: "",
        origin: "",
        transit: "",
        destination: "",
        tripType: "Round Trip",
        issueMonth: "",
        IssueDay: "",
        issueYear: "",
        buyingPrice: "",
        payment: "",
      });
    }
  }, [booking, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  // New Design for Read-Only mode
  if (isReadOnly && booking) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className="relative z-50 w-full max-w-[720px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-display">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-[#0d131b] text-xl font-bold leading-tight tracking-tight">Booking Details</h2>
              <p className="text-[#4c6c9a] text-sm font-medium mt-1">ID: #ST-{booking.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="group p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-800">close</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Passenger Information Section */}
            <section>
              <div className="items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                <h3 className="text-[#0d131b] text-base font-bold">Passenger Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg p-5 border border-slate-100">
                <div className="flex flex-col gap-1">
                  <p className="text-[#4c6c9a] text-xs font-semibold uppercase tracking-wider">Passenger Name</p>
                  <p className="text-[#0d131b] text-base font-medium">{booking.travellerFirstName} {booking.travellerLastName}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#4c6c9a] text-xs font-semibold uppercase tracking-wider">PNR</p>
                  <p className="text-[#0d131b] text-base font-medium font-mono uppercase">{booking.PNR}</p>
                </div>
                <div className="flex flex-col gap-1 pt-4 border-t border-slate-200">
                  <p className="text-[#4c6c9a] text-xs font-semibold uppercase tracking-wider">Ticket Number</p>
                  <p className="text-[#0d131b] text-base font-medium font-mono">{booking.ticketNumber}</p>
                </div>
                <div className="flex flex-col gap-1 pt-4 border-t border-slate-200">
                  <p className="text-[#4c6c9a] text-xs font-semibold uppercase tracking-wider">Status</p>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      booking.payment.toLowerCase() === 'paid' || booking.payment.toLowerCase() === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {booking.payment.toLowerCase() === 'paid' || booking.payment.toLowerCase() === 'confirmed' ? 'check_circle' : 'pending'}
                      </span>
                      {booking.payment}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Flight Journey Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">flight</span>
                  <h3 className="text-[#0d131b] text-base font-bold">Flight Journey</h3>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-white border border-slate-100 px-2 py-1 rounded">
                  {booking.transit ? 'Flexible' : 'Non-stop'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                {/* Airline Logo Placeholder */}
                <div className="flex-shrink-0 bg-white p-2 rounded-lg border border-slate-100 w-16 h-16 flex items-center justify-center">
                  <div 
                    className="bg-contain bg-center bg-no-repeat w-full h-full flex items-center justify-center font-bold text-xs text-primary"
                    style={{ backgroundImage: booking.airlines.toLowerCase().includes('british') ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARLWHt3uUJTCz_6tL6Blx8SOaQKags6bxCKPt3Pr2ETIwptsFmE_X0ZeTRorK8qXm_XYi3wBWIAsvd9XvBzpnA1inuEn9iYuOHCoQ72BUDUeOs7FG7NW2mp3XAKxLUch3e7-LLBv2_WZfqqZYrXzlYODnNYOahLj5WUwfJNwmlGTsK_LuxHOpU6IQf1lHbYGEL4gnPMlzzlKaK7hck9L9OKID4-phWNJ5TDFS-FglVE2-QxD5A2ICSNH6kwYhuSU-nRJDAIkajgYB2")' : 'none' }}
                  >
                    {!booking.airlines.toLowerCase().includes('british') && booking.airlines.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                {/* Journey Details */}
                <div className="flex-grow flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-[#0d131b] text-lg font-bold truncate uppercase">{booking.origin.substring(0, 3)}</h4>
                    <div className="flex-1 flex items-center justify-center min-w-[60px] max-w-[120px] relative">
                      <div className="h-[1px] bg-slate-300 w-full absolute top-1/2 left-0 -translate-y-1/2"></div>
                      <span className="material-symbols-outlined text-primary bg-white px-1 relative z-10 text-[18px] transform rotate-90">flight</span>
                    </div>
                    <h4 className="text-[#0d131b] text-lg font-bold truncate uppercase">{booking.destination.substring(0, 3)}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4c6c9a]">
                    <span className="truncate">{booking.origin}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0"></span>
                    <span className="truncate">{booking.destination}</span>
                  </div>
                </div>
                {/* Meta */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 text-sm sm:pl-4 sm:border-l sm:border-slate-100 w-full sm:w-auto justify-between sm:justify-start mt-2 sm:mt-0">
                  <span className="text-[#0d131b] font-semibold">{booking.buyingPrice}</span>
                  <span className="text-[#4c6c9a] text-xs">{booking.airlines}</span>
                </div>
              </div>
            </section>

            {/* Additional Details Grid */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                <h3 className="text-[#0d131b] text-base font-bold">Trip Details</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
                <div className="flex flex-col gap-1.5 border-l-2 border-primary/20 pl-3">
                  <p className="text-[#4c6c9a] text-xs font-normal">Trip Type</p>
                  <p className="text-[#0d131b] text-sm font-semibold">{booking.tripType}</p>
                </div>
                <div className="flex flex-col gap-1.5 border-l-2 border-primary/20 pl-3">
                  <p className="text-[#4c6c9a] text-xs font-normal">Issue Date</p>
                  <p className="text-[#0d131b] text-sm font-semibold">{booking.IssueDay} {booking.issueMonth} {booking.issueYear}</p>
                </div>
                <div className="flex flex-col gap-1.5 border-l-2 border-primary/20 pl-3">
                  <p className="text-[#4c6c9a] text-xs font-normal">Transit</p>
                  <p className="text-[#0d131b] text-sm font-semibold truncate">{booking.transit || 'Non-stop'}</p>
                </div>
                <div className="flex flex-col gap-1.5 border-l-2 border-primary/20 pl-3">
                  <p className="text-[#4c6c9a] text-xs font-normal">Price</p>
                  <p className="text-[#0d131b] text-sm font-semibold">{booking.buyingPrice}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-end gap-3">
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all focus:ring-2 focus:ring-slate-200">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              Download Invoice
            </button>
            <button 
              onClick={onEdit}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-primary/20 transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              Edit Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {booking ? "Edit Booking" : "Create New Booking"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            disabled={isLoading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="travellerFirstName"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Traveller First Name *
              </label>
              <input
                type="text"
                id="travellerFirstName"
                name="travellerFirstName"
                value={formData.travellerFirstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="John"
              />
            </div>

            <div>
              <label
                htmlFor="travellerLastName"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Traveller Last Name *
              </label>
              <input
                type="text"
                id="travellerLastName"
                name="travellerLastName"
                value={formData.travellerLastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="Doe"
              />
            </div>

            <div>
              <label
                htmlFor="PNR"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                PNR *
              </label>
              <input
                type="text"
                id="PNR"
                name="PNR"
                value={formData.PNR}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="ABC123"
              />
            </div>

            <div>
              <label
                htmlFor="ticketNumber"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Ticket Number *
              </label>
              <input
                type="text"
                id="ticketNumber"
                name="ticketNumber"
                value={formData.ticketNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="1234567890"
              />
            </div>

            <div>
              <label
                htmlFor="airlines"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Airlines *
              </label>
              <input
                type="text"
                id="airlines"
                name="airlines"
                value={formData.airlines}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="Emirates"
              />
            </div>

            <div>
              <label
                htmlFor="origin"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Origin *
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="New York, USA"
              />
            </div>

            <div>
              <label
                htmlFor="transit"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Transit
              </label>
              <input
                type="text"
                id="transit"
                name="transit"
                value={formData.transit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="Dubai, UAE"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Destination *
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="Paris, France"
              />
            </div>

            <div>
              <label
                htmlFor="tripType"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Trip Type *
              </label>
              <select
                id="tripType"
                name="tripType"
                value={formData.tripType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900"
              >
                <option value="Round Trip">Round Trip</option>
                <option value="One Way">One Way</option>
                <option value="Multi-City">Multi-City</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="issueMonth"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Issue Month *
              </label>
              <input
                type="text"
                id="issueMonth"
                name="issueMonth"
                value={formData.issueMonth}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="01"
              />
            </div>

            <div>
              <label
                htmlFor="IssueDay"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Issue Day *
              </label>
              <input
                type="text"
                id="IssueDay"
                name="IssueDay"
                value={formData.IssueDay}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="15"
              />
            </div>

            <div>
              <label
                htmlFor="issueYear"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Issue Year *
              </label>
              <input
                type="text"
                id="issueYear"
                name="issueYear"
                value={formData.issueYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="2026"
              />
            </div>

            <div>
              <label
                htmlFor="buyingPrice"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Buying Price *
              </label>
              <input
                type="text"
                id="buyingPrice"
                name="buyingPrice"
                value={formData.buyingPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="1250.00"
              />
            </div>

            <div>
              <label
                htmlFor="payment"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Payment *
              </label>
              <input
                type="text"
                id="payment"
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 placeholder:text-slate-400"
                placeholder="Paid"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg text-slate-700 font-semibold bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow-sm shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && (
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>
                {isLoading
                  ? "Saving..."
                  : booking
                  ? "Update Booking"
                  : "Create Booking"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
