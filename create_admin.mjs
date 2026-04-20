import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const email = 'admin@dreamrest.com';
const password = 'Admin@123456';

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
    const existing = list.users.find(u => u.email === email);
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
console.log('✓ Admin role assigned');
console.log('Email:', email);
console.log('Password:', password);
