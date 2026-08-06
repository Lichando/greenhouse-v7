import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { RoleDashboard } from './RoleDashboard';
import { RoleSelection } from './RoleSelection';

export const metadata = {
  title: 'Dashboard | GreenHouse',
  description: 'Tu espacio de trabajo en GreenHouse.',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase.from('profiles').select('role, name').eq('id', user.id).maybeSingle();
  const name = profile?.name ?? user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'usuario';

  if (!profile || profile.role === 'USER') {
    return <RoleSelection userId={user.id} />;
  }

  if (profile.role === 'CLIENT' || profile.role === 'AGENCY' || profile.role === 'DEVELOPER') {
    return <RoleDashboard role={profile.role} name={name} />;
  }

  redirect('/auth/login?error=invalid_profile');
}
