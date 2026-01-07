"use client";

import { useState, useEffect } from "react";

export default function BookingModal({
  isOpen,
  onClose,
  onSave,
  onEdit,
  booking,
  isLoading,
  isReadOnly = false,
}) {
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [showStopover, setShowStopover] = useState(false);
  const [formData, setFormData] = useState({
    email: "sarita.p@example.com",
    phone: "+61 412 345 678",
    travellerFirstName: "",
    travellerLastName: "",
    passportNumber: "",
    passportExpiry: "",
    nationality: "Nepalese",
    dob: "1985-03-15",
    tripType: "One Way",
    travelDate: "",
    origin: "",
    destination: "",
    transit: "",
    airlines: "",
    flightNumber: "",
    flightClass: "Economy",
    frequentFlyer: "",
    pnr: "",
    ticketNumber: "",
    issueMonth: "",
    IssueDay: "",
    issueYear: "",
    agency: "SkyHigh Agency Ltd.",
    handledBy: "John Doe",
    status: "Confirmed",
    currency: "USD",
    paymentStatus: "Pending",
    paymentMethod: "",
    transactionId: "",
    paymentDate: "",
    buyingPrice: "0.00",
    costPrice: "0.00",
    sellingPrice: "0.00",
    payment: "Pending", // For backward compatibility
    addons: {
      meals: false,
      wheelchair: false,
      pickup: false,
      dropoff: false,
      luggage: false,
    },
    prices: {
      meals: "0.00",
      wheelchair: "0.00",
      pickup: "0.00",
      dropoff: "0.00",
      luggage: "0.00",
    }
  });

  useEffect(() => {
    if (booking) {
      setFormData((prev) => ({
        ...prev,
        ...booking,
        pnr: booking.PNR || prev.pnr,
        // Ensure all fields are mapped
        issueMonth: booking.issueMonth || "",
        IssueDay: booking.IssueDay || "",
        issueYear: booking.issueYear || "",
        buyingPrice: booking.buyingPrice || "0.00",
        payment: booking.payment || "Pending",
      }));
    } else {
      // Reset for new booking
      setFormData({
        email: "",
        phone: "",
        travellerFirstName: "",
        travellerLastName: "",
        passportNumber: "",
        passportExpiry: "",
        nationality: "Australian",
        dob: "",
        tripType: "One Way",
        travelDate: "",
        origin: "",
        destination: "",
        transit: "",
        airlines: "",
        flightNumber: "",
        flightClass: "Economy",
        frequentFlyer: "",
        pnr: "",
        ticketNumber: "",
        issueMonth: "",
        IssueDay: "",
        issueYear: "",
        agency: "SkyHigh Agency Ltd.",
        handledBy: "",
        status: "Confirmed",
        currency: "USD",
        paymentStatus: "Pending",
        paymentMethod: "",
        transactionId: "",
        paymentDate: "",
        buyingPrice: "0.00",
        costPrice: "0.00",
        sellingPrice: "0.00",
        payment: "Pending",
        addons: {
          meals: false,
          wheelchair: false,
          pickup: false,
          dropoff: false,
          luggage: false,
        },
        prices: {
          meals: "0.00",
          wheelchair: "0.00",
          pickup: "0.00",
          dropoff: "0.00",
          luggage: "0.00",
        }
      });
    }
  }, [booking, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name.startsWith("addon-")) {
      const addonName = name.replace("addon-", "");
      setFormData((prev) => ({
        ...prev,
        addons: { ...prev.addons, [addonName]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReadOnly) return;
    // Map back to the Booking interface structure before saving
    const bookingToSave = {
      travellerFirstName: formData.travellerFirstName,
      travellerLastName: formData.travellerLastName,
      PNR: formData.pnr,
      ticketNumber: formData.ticketNumber || (formData.pnr + "01"),
      airlines: formData.airlines,
      origin: formData.origin,
      transit: formData.transit,
      destination: formData.destination,
      tripType: formData.tripType,
      issueMonth: formData.issueMonth || new Date().getMonth() + 1 + "",
      IssueDay: formData.IssueDay || new Date().getDate() + "",
      issueYear: formData.issueYear || new Date().getFullYear() + "",
      buyingPrice: formData.buyingPrice,
      payment: formData.paymentStatus, // Or use formData.payment
    };
    onSave(bookingToSave);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-6xl h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-gray-200 mx-4">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8 z-10 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {booking ? "Edit Booking" : "New Booking"}
            </h1>
            <p className="text-xs text-gray-500">
              {booking ? `Manage details for Booking #${booking.id}` : "Enter new booking details"}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <span className="material-icons-outlined text-2xl">close</span>
            </button>
          </div>
        </header>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <main className="p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Columns (Main Form) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Customer Contact Details */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <span className="material-icons-outlined text-gray-400 mr-2">contact_mail</span>
                        Customer Contact Details
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="material-icons-outlined text-gray-400 text-sm">email</span>
                            </div>
                            <input 
                              className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm" 
                              name="email" 
                              type="email" 
                              value={formData.email}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="material-icons-outlined text-gray-400 text-sm">phone</span>
                            </div>
                            <input 
                              className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm" 
                              name="phone" 
                              type="tel" 
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Traveller Information */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <span className="material-icons-outlined text-gray-400 mr-2">person</span>
                        Traveller Information
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="mb-8 p-4 bg-gray-50  rounded-lg border border-gray-100 ">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <input defaultChecked className="focus:ring-primary h-4 w-4 text-primary border-gray-300  " name="customer-type" type="radio" value="existing"/>
                            <label className="font-medium text-gray-700  text-sm whitespace-nowrap">Existing Traveller</label>
                          </div>
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <input className="focus:ring-primary h-4 w-4 text-primary border-gray-300  " name="customer-type" type="radio" value="new"/>
                            <label className="font-medium text-gray-700  text-sm whitespace-nowrap">New Traveller</label>
                          </div>
                          <div className="w-full sm:flex-1 sm:ml-4 relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="material-icons-outlined text-gray-400 text-sm">search</span>
                            </div>
                            <input className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm shadow-sm" placeholder="Search existing customer..."/>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700  mb-1">First Name</label>
                          <input 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                            name="travellerFirstName" 
                            type="text" 
                            value={formData.travellerFirstName}
                            onChange={handleChange}
                            disabled={isReadOnly}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700  mb-1">Last Name</label>
                          <input 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                            name="travellerLastName" 
                            type="text" 
                            value={formData.travellerLastName}
                            onChange={handleChange}
                            disabled={isReadOnly}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-icons-outlined text-gray-400 text-sm">badge</span>
                              </div>
                              <input 
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                name="passportNumber" 
                                placeholder="e.g. A1234567X" 
                                type="text"
                                value={formData.passportNumber}
                                onChange={handleChange}
                                disabled={isReadOnly}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700  mb-1">Passport Expiry Date</label>
                            <input 
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                              name="passportExpiry" 
                              type="date"
                              value={formData.passportExpiry}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            />
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                            <select 
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                              name="nationality"
                              value={formData.nationality}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            >
                              <option>Australian</option>
                              <option>Nepalese</option>
                              <option>Singaporean</option>
                              <option>American</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700  mb-1">Date of Birth</label>
                            <input 
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                              name="dob" 
                              type="date"
                              value={formData.dob}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route & Trip Details */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <span className="material-icons-outlined text-gray-400 mr-2">flight_takeoff</span>
                        Route & Trip Details
                      </h3>
                      <button 
                        type="button"
                        onClick={() => setShowStopover(!showStopover)}
                        className={`text-sm font-medium transition-colors flex items-center ${showStopover ? 'text-red-600 hover:text-red-700' : 'text-primary hover:text-blue-700'}`}
                      >
                        <span className="material-icons-outlined text-base mr-1">
                          {showStopover ? 'remove_circle_outline' : 'add_circle_outline'}
                        </span>
                        {showStopover ? 'Remove Stopover' : 'Add Stopover'}
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700  mb-1">Trip Type</label>
                          <select 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                            name="tripType"
                            value={formData.tripType}
                            onChange={handleChange}
                            disabled={isReadOnly}
                          >
                            <option>One Way</option>
                            <option>Round Trip</option>
                            <option>Multi City</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700  mb-1">Travel Date</label>
                          <input 
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                            name="travelDate" 
                            type="date"
                            value={formData.travelDate}
                            onChange={handleChange}
                            disabled={isReadOnly}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700  mb-1">Origin (From)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="material-icons-outlined text-gray-400 text-sm">flight_takeoff</span>
                            </div>
                            <input 
                              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                              name="origin" 
                              placeholder="City or Airport" 
                              type="text"
                              value={formData.origin}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700  mb-1">Destination (To)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="material-icons-outlined text-gray-400 text-sm">flight_land</span>
                            </div>
                            <input 
                              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                              name="destination" 
                              placeholder="City or Airport" 
                              type="text"
                              value={formData.destination}
                              onChange={handleChange}
                              disabled={isReadOnly}
                            />
                          </div>
                        </div>

                        {showStopover && (
                          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-5 mt-2 mb-2 relative transition-all duration-300 ease-in-out">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-primary ring-2 ring-blue-100"></span>
                              Stopover Segment Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700  mb-1">Stopover Location</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-gray-400 text-sm">place</span>
                                  </div>
                                  <input 
                                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                    name="stopoverLocation" 
                                    placeholder="City, Airport Code" 
                                    type="text"
                                    value={formData.stopoverLocation}
                                    onChange={handleChange}
                                    disabled={isReadOnly}
                                  />
                                </div>
                              </div>
                              <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700  mb-1">Arrival Date</label>
                                <input 
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                  name="stopoverArrival" 
                                  type="date"
                                  value={formData.stopoverArrival}
                                  onChange={handleChange}
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700  mb-1">Departure Date</label>
                                <input 
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                  name="stopoverDeparture" 
                                  type="date"
                                  value={formData.stopoverDeparture}
                                  onChange={handleChange}
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="md:col-span-2 border-t border-gray-100  pt-4 mt-2">
                          <h4 className="text-xs font-semibold text-gray-500  uppercase tracking-wider mb-4">Flight Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                              <label className="block text-sm font-medium text-gray-700  mb-1">Airline</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="material-icons-outlined text-gray-400 text-sm">airlines</span>
                                </div>
                                <input 
                                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                  name="airlines" 
                                  placeholder="e.g. Singapore Airlines" 
                                  type="text"
                                  value={formData.airlines}
                                  onChange={handleChange}
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-sm font-medium text-gray-700  mb-1">Flight No.</label>
                              <input 
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                name="flightNumber" 
                                placeholder="e.g. SQ218" 
                                type="text"
                                value={formData.flightNumber}
                                onChange={handleChange}
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-sm font-medium text-gray-700  mb-1">Class</label>
                              <select 
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                name="flightClass"
                                value={formData.flightClass}
                                onChange={handleChange}
                                disabled={isReadOnly}
                              >
                                <option>Economy</option>
                                <option>Premium Economy</option>
                                <option>Business</option>
                                <option>First Class</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 mt-2">
                          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-3">
                            <span className="material-icons-outlined text-blue-500 mt-0.5">info</span>
                            <div>
                              <p className="text-sm text-blue-800 font-medium">Itinerary Modification</p>
                              <p className="text-xs text-blue-600 mt-0.5">Changing origin, destination, or dates may affect pricing.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add-ons & Services */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <span className="material-icons-outlined text-gray-400 mr-2">extension</span>
                        Add-ons & Services
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-xs font-semibold text-gray-500  uppercase tracking-wider mb-4">Ancillary Services</h4>
                          
                          {/* Meals */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <label className="flex items-center space-x-3 cursor-pointer group">
                                <input 
                                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary   transition duration-150 ease-in-out" 
                                  type="checkbox"
                                  name="addon-meals"
                                  checked={formData.addons.meals}
                                  onChange={handleChange}
                                />
                                <span className="text-sm font-medium text-gray-700  group-hover:text-primary transition-colors">Meals</span>
                              </label>
                              <button 
                                type="button"
                                onClick={() => setIsMealModalOpen(true)}
                                className="ml-3 text-xs font-medium text-primary hover:text-blue-600 :text-blue-400 cursor-pointer flex items-center gap-1 transition-colors select-none"
                              >
                                <span className="material-icons-outlined text-[16px]">tune</span>
                                Select Options
                              </button>
                            </div>
                            <div className="relative w-32">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500  sm:text-xs">$</span>
                              <input className="block w-full rounded-md border-gray-300 pl-7 py-1.5 focus:border-primary    sm:text-sm text-right" placeholder="0.00" type="number"/>
                            </div>
                          </div>

                          {/* Request Wheelchair */}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                              <input 
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary   transition duration-150 ease-in-out" 
                                type="checkbox"
                                name="addon-wheelchair"
                                checked={formData.addons.wheelchair}
                                onChange={handleChange}
                              />
                              <span className="text-sm font-medium text-gray-700  group-hover:text-primary transition-colors">Request Wheelchair</span>
                            </label>
                            <div className="relative w-32">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500  sm:text-xs">$</span>
                              <input className="block w-full rounded-md border-gray-300 pl-7 py-1.5 focus:border-primary    sm:text-sm text-right" placeholder="0.00" type="number"/>
                            </div>
                          </div>

                          {/* Airport Pick-up */}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                              <input 
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary   transition duration-150 ease-in-out" 
                                type="checkbox"
                                name="addon-pickup"
                                checked={formData.addons.pickup}
                                onChange={handleChange}
                              />
                              <span className="text-sm font-medium text-gray-700  group-hover:text-primary transition-colors">Airport Pick-up</span>
                            </label>
                            <div className="relative w-32">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500  sm:text-xs">$</span>
                              <input className="block w-full rounded-md border-gray-300 pl-7 py-1.5 focus:border-primary    sm:text-sm text-right" placeholder="0.00" type="number"/>
                            </div>
                          </div>

                          <div className="pt-4 mt-2 border-t border-gray-100  flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700 ">Add-ons Subtotal</span>
                            <div className="text-lg font-bold text-primary">$25.00</div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700  mb-1">Frequent Flyer Number</label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-icons-outlined text-gray-400 text-sm">loyalty</span>
                              </div>
                              <input 
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50    sm:text-sm" 
                                name="frequentFlyer" 
                                placeholder="e.g. AA-12345678" 
                                type="text"
                                value={formData.frequentFlyer}
                                onChange={handleChange}
                                disabled={isReadOnly}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700  mb-2">Seat Selection</label>
                            <div className="border-2 border-dashed border-gray-300  rounded-lg p-4 bg-gray-50  flex flex-col items-center justify-center text-center hover:bg-gray-100 :bg-gray-800/50 transition-colors cursor-pointer group h-24">
                              <span className="material-icons-outlined text-gray-400 group-hover:text-primary mb-1 transition-colors">event_seat</span>
                              <span className="text-sm font-medium text-gray-600  group-hover:text-primary transition-colors">Select Seat</span>
                              <span className="text-xs text-gray-500  mt-1 font-medium group-hover:text-primary transition-colors">$25.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-6">
                  {/* Booking Details */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500  mb-1">Booking ID</label>
                        <input className="block w-full rounded-md border-gray-200 bg-gray-50 text-gray-500 shadow-sm cursor-not-allowed    sm:text-sm" readOnly type="text" value={booking?.id ? `#${booking.id}` : "NEW"}/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">PNR Reference</label>
                        <input 
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary    font-mono uppercase sm:text-sm" 
                          name="pnr" 
                          type="text"
                          value={formData.pnr}
                          onChange={handleChange}
                          disabled={isReadOnly}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Issued through Agency</label>
                        <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary    sm:text-sm" name="agency" value={formData.agency} onChange={handleChange} disabled={isReadOnly}>
                          <option>SkyHigh Agency Ltd.</option>
                          <option>Global Travels Inc.</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Booking Status</label>
                        <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary    sm:text-sm" name="status" value={formData.status} onChange={handleChange} disabled={isReadOnly}>
                          <option>Confirmed</option>
                          <option>Pending</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900">Financials</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Payment Status</label>
                        <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary    sm:text-sm" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} disabled={isReadOnly}>
                          <option>Paid</option>
                          <option>Pending</option>
                          <option>Refunded</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Cost Price ($)</label>
                        <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary    sm:text-sm" name="costPrice" type="number" step="0.01" value={formData.costPrice} onChange={handleChange} disabled={isReadOnly}/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Selling Price ($)</label>
                        <input className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary    sm:text-sm font-semibold text-primary" name="sellingPrice" type="number" step="0.01" value={formData.sellingPrice} onChange={handleChange} disabled={isReadOnly}/>
                      </div>

                      <div className="bg-gray-100  rounded p-4 mt-4 border border-gray-200 ">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600 ">Base Cost</span>
                          <span className="text-sm font-medium text-gray-900 ">${formData.costPrice}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 ">
                          <span className="text-base font-bold text-gray-900 ">Grand Total</span>
                          <span className="text-lg font-bold text-primary">$735.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col gap-3 sticky bottom-0 bg-gray-50 p-2 -mx-2">
                    <button 
                      className="w-full flex justify-center items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50" 
                      type="submit"
                      disabled={isLoading}
                    >
                      <span className="material-icons-outlined text-lg mr-2">save</span>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button 
                      className="w-full flex justify-center items-center px-4 py-3 border border-gray-300  shadow-sm text-sm font-medium rounded-md text-gray-700  bg-white  hover:bg-gray-50 :bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" 
                      type="button"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>

      {/* Meal Modal */}
      {isMealModalOpen && (
        <div className="fixed inset-0 z-[60] flex justify-center items-center overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsMealModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden ring-1 ring-black/5 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Select Meal Options</h3>
              <button onClick={() => setIsMealModalOpen(false)} className="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              {['No Meal', 'Standard Meal', 'Vegetarian Meal', 'Vegan Meal'].map((meal) => (
                <label key={meal} className="flex items-center justify-between p-4 rounded-lg border border-gray-200  cursor-pointer hover:border-primary/50 hover:bg-blue-50/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <input className="focus:ring-primary h-4 w-4 text-primary border-gray-300" name="meal_option" type="radio" value={meal.toLowerCase().replace(' ', '-')}/>
                    <div>
                      <span className="block text-sm font-medium text-gray-900 ">{meal}</span>
                      <span className="block text-xs text-gray-500 mt-0.5">Meal description here</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 ">$15.00</div>
                </label>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-100  flex justify-end gap-3 bg-gray-50/50 ">
              <button onClick={() => setIsMealModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={() => setIsMealModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Material Icons Link */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"/>
    </div>
  );
}
