"use client";

import { useState, useEffect } from "react";
import { Booking } from "@/lib/api/bookings";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  booking: Booking | null;
  isLoading: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  onSave,
  booking,
  isLoading,
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
