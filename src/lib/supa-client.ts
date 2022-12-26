import { env } from "$env/dynamic/public";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = env.PUBLIC_SUPABASE_API_URL as string;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY as string;

export const supaClient = createClient<Database>(supabaseUrl, supabaseKey);