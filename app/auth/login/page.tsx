import { MainLayout } from '@/src/components/layout/MainLayout';
import { LoginForm } from '@/src/modules/auth/components/LoginForm';

export const metadata = {
  title: 'Log In',
};

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="fade-in-up text-center">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="fade-in-up-1 mt-2 text-neutral-600 dark:text-neutral-400">
              Sign in to your account to continue
            </p>
          </div>

          <div className="fade-in-up-2 rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
