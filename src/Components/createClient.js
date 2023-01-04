import { createClient } from '@supabase/supabase-js';

const apiUrl="https://psvydhidmrmlujdgzvsx.supabase.co"; 
const apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzdnlkaGlkbXJtbHVqZGd6dnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI4MDY2ODYsImV4cCI6MTk4ODM4MjY4Nn0.vrsgaFZEMbemgpO9zE5LFVcBV6SrBuKj5REnQygkkXc"; 


const supabase = createClient(apiUrl,apiKey);


export default supabase;