import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseStorageKey = import.meta.env.VITE_SUPABASE_STORAGE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseSignup = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: supabaseStorageKey,
  },
});

export default supabase;
