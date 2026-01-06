// Supabase REST API configuration
const SUPABASE_REST_URL = "https://tjrmemmsieltajotxddk.supabase.co/rest/v1";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_ANON_KEY;

// Types
export interface Booking {
  id?: number;
  travellerFirstName: string;
  travellerLastName: string;
  PNR: string;
  ticketNumber: string;
  airlines: string;
  origin: string;
  transit: string;
  destination: string;
  tripType: string;
  issueMonth: string;
  IssueDay: string;
  issueYear: string;
  buyingPrice: string;
  payment: string;
  created_at?: string;
  updated_at?: string;
}

// Helper function to get headers
const getHeaders = (contentType = false): HeadersInit => {
  const headers: HeadersInit = {
    apikey: SUPABASE_ANON_KEY || "",
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };

  if (contentType) {
    headers["Content-Type"] = "application/json";
    headers["Prefer"] = "return=minimal";
  }

  return headers;
};

// GET - Fetch bookings with pagination
export async function getBookings(
  page: number = 1,
  limit: number = 10
): Promise<{
  data: Booking[] | null;
  totalCount: number;
  error: string | null;
}> {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(
      `${SUPABASE_REST_URL}/bookings?select=*&limit=${limit}&offset=${offset}&order=id.asc`,
      {
        method: "GET",
        headers: {
          ...getHeaders(),
          Prefer: "count=exact",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        data: null,
        totalCount: 0,
        error: `Failed to fetch bookings: ${errorText}`,
      };
    }

    const data = await response.json();
    const contentRange = response.headers.get("content-range");
    const totalCount = contentRange ? parseInt(contentRange.split("/")[1]) : 0;

    return { data, totalCount, error: null };
  } catch (error) {
    return { data: null, totalCount: 0, error: `Error fetching bookings: ${error}` };
  }
}

// POST - Create a new booking
export async function createBooking(
  booking: Booking
): Promise<{ data: any; error: string | null }> {
  try {
    const response = await fetch(`${SUPABASE_REST_URL}/bookings`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { data: null, error: `Failed to create booking: ${errorText}` };
    }

    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: `Error creating booking: ${error}` };
  }
}

// PATCH - Update an existing booking
export async function updateBooking(
  id: number,
  updates: Partial<Booking>
): Promise<{ data: any; error: string | null }> {
  try {
    const response = await fetch(`${SUPABASE_REST_URL}/bookings?id=eq.${id}`, {
      method: "PATCH",
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { data: null, error: `Failed to update booking: ${errorText}` };
    }

    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: `Error updating booking: ${error}` };
  }
}

// DELETE - Delete a booking
export async function deleteBooking(
  id: number
): Promise<{ data: any; error: string | null }> {
  try {
    const response = await fetch(`${SUPABASE_REST_URL}/bookings?id=eq.${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { data: null, error: `Failed to delete booking: ${errorText}` };
    }

    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: `Error deleting booking: ${error}` };
  }
}
