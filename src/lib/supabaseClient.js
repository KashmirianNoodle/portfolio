import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(
  SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);
;

const test = async () => {
  const { data, error } = await supabase
    .from("visitors")
    .select("*");

  console.log('='.repeat(10))
  console.log(data, error);
};

test();