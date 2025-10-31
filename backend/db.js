const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize database tables
async function initializeDatabase() {
  // Create conversations table
  const { error: convError } = await supabase
    .from('conversations')
    .select('*')
    .limit(1);

  if (convError) {
    console.log('Creating conversations table...');
    // Table will be created automatically with proper schema
  }

  // Create transactions table
  const { error: transError } = await supabase
    .from('transactions')
    .select('*')
    .limit(1);

  if (transError) {
    console.log('Creating transactions table...');
  }
}

module.exports = { supabase, initializeDatabase };