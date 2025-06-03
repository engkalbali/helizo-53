import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://buxlpvxtitehccsqaljd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eGxwdnh0aXRlaGNjc3FhbGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMDg0NDYsImV4cCI6MjA2MjY4NDQ0Nn0.X5npTB9htPxZUzcghguClCt-VzOqlVu00qS1zVCSzlA'
);