import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, serviceKey);
