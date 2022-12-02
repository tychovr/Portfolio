import { createClient } from '@supabase/supabase-js';
import AsyncLocalStorage from '@createnextapp/async-local-storage'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
const db = createClient(SUPABASE_URL, SUPABASE_KEY, {
  localStorage: AsyncLocalStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

export default db;