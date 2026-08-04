import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Credentials must be supplied via environment variables.
// Never hardcode admin credentials in source control.
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error(
    'Missing ADMIN_EMAIL and/or ADMIN_PASSWORD environment variables.\n' +
      'Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=<strong-password> node create_admin.mjs'
  );
  process.exit(1);
}

if (password.length < 12) {
  console.error('ADMIN_PASSWORD must be at least 12 characters long.');
  process.exit(1);
}

// Create user (auto-confirmed)
const { data: created, error: createErr } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

let userId;
if (createErr) {
  if (createErr.message.includes('already') || createErr.code === 'email_exists') {
    // Find existing user
    const { data: list } = await supabase.auth.admin.listUsers();
    const existing = list.users.find((u) => u.email === email);
    if (!existing) { console.error('Not found'); process.exit(1); }
    userId = existing.id;
    console.log('User already exists:', userId);
  } else {
    console.error('Create error:', createErr); process.exit(1);
  }
} else {
  userId = created.user.id;
  console.log('Created user:', userId);
}

// Assign admin role
const { error: roleErr } = await supabase
  .from('user_roles')
  .upsert({ user_id: userId, role: 'admin' }, { onConflict: 'user_id,role' });

if (roleErr) { console.error('Role error:', roleErr); process.exit(1); }
console.log('✓ Admin role assigned for', email);
