// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aqxaieiqtzpsvswbydqh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeGFpZWlxdHpwc3Zzd2J5ZHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzOTA0OTksImV4cCI6MjA0OTk2NjQ5OX0.hKO0x_EFPnkIcvu3c7dZiVcHXm9Mi0D9vIlvB3n9dQE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);