// Supabase REST API configuration for Customers
const SUPABASE_REST_URL = "https://tjrmemmsieltajotxddk.supabase.co/rest/v1";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_ANON_KEY;

// Types
export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  userType: string;
  isActive: string;
  country: string;
  address: any;
  phoneCountryCode: string;
  isDisabled: string;
  isVerified: string;
  passport: any;
  socialProvider: string;
  socialId: string;
  referralCode: string;
  created_at?: string;
}

// Helper function to get headers
const getHeaders = (): HeadersInit => {
  return {
    apikey: SUPABASE_ANON_KEY || "",
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
};

// GET - Fetch customers with pagination
export async function getCustomers(
  page: number = 1,
  limit: number = 10
): Promise<{
  data: Customer[] | null;
  totalCount: number;
  error: string | null;
}> {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(
      `${SUPABASE_REST_URL}/customers?select=*&limit=${limit}&offset=${offset}`,
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
        error: `Failed to fetch customers: ${errorText}`,
      };
    }

    const data = await response.json();
    const contentRange = response.headers.get("content-range");
    const totalCount = contentRange ? parseInt(contentRange.split("/")[1]) : 0;

    return { data, totalCount, error: null };
  } catch (error) {
    return { data: null, totalCount: 0, error: `Error fetching customers: ${error}` };
  }
}
