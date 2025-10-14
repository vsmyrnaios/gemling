import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nzqlzbuvhhghldcfdwbl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cWx6YnV2aGhnaGxkY2Zkd2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5ODg3NzYsImV4cCI6MjA1NTU2NDc3Nn0.QbXiX8g2ZyvWourKreNd6xFV-pthkquZFADUyZg-UXA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
