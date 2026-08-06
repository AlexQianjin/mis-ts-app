import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@repo/shared-types';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { authClient } from '../../../lib/auth';

const fieldClassName =
  'grid gap-[9px] text-[0.9rem] font-bold text-[#263452] [&_input]:min-h-[52px] [&_input]:w-full [&_input]:rounded-[11px] [&_input]:border [&_input]:border-[#ccd6e5] [&_input]:bg-[#fbfcfe] [&_input]:px-4 [&_input]:text-[#16213c] [&_input]:outline-none [&_input]:transition-[border-color,box-shadow,background] [&_input]:duration-150 [&_input]::placeholder:text-[#97a3b7] [&_input:focus]:border-[#526cd3] [&_input:focus]:bg-white [&_input:focus]:shadow-[0_0_0_4px_rgb(82_108_211_/_12%)]';

export function LoginPage() {
  const [notice, setNotice] = useState('');
  const queryClient = useQueryClient();
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (values: LoginInput) => {
    setNotice('');
    clearErrors('root');

    try {
      const result = await authClient.signIn.email(values);

      if (result.error) {
        setError('root', {
          message:
            result.error.status === 401
              ? 'The email or password is incorrect.'
              : result.error.message || 'Unable to sign in. Please try again.'
        });
        return;
      }

      await queryClient.invalidateQueries();
      window.location.assign('/');
    } catch {
      setError('root', {
        message: 'Unable to reach the authentication service. Please try again.'
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#edf2f8] bg-[radial-gradient(circle_at_8%_12%,rgb(82_108_211_/_12%),transparent_28rem)] p-6 max-[780px]:p-0">
      <section
        className="mx-auto grid min-h-[calc(100vh-48px)] max-w-[1240px] grid-cols-[minmax(300px,0.9fr)_minmax(420px,1.1fr)] overflow-hidden rounded-[28px] border border-white/75 bg-white shadow-[0_28px_90px_rgb(26_42_75_/_14%)] max-[780px]:block max-[780px]:min-h-screen max-[780px]:rounded-none max-[780px]:border-0"
        aria-labelledby="login-title"
      >
        <aside className="flex flex-col bg-[radial-gradient(circle_at_90%_15%,rgb(255_255_255_/_16%),transparent_16rem),linear-gradient(145deg,#172349_0%,#30499a_55%,#526cd3_100%)] p-[clamp(2rem,5vw,4rem)] text-white max-[780px]:min-h-[250px] max-[780px]:p-7">
          <Link
            className="inline-flex items-center gap-3 self-start text-[0.95rem] font-[750] text-inherit no-underline"
            to="/"
            aria-label="MIS home"
          >
            <span className="grid size-[38px] place-items-center rounded-xl border border-white/40 bg-white/10 text-base">
              M
            </span>
            <span>MIS Workspace</span>
          </Link>

          <div className="my-auto py-[72px] max-[780px]:py-[52px_24px]">
            <p className="mb-4 text-xs font-extrabold tracking-[0.14em] text-[#cdd7ff]">
              YOUR WORK, IN ONE PLACE
            </p>
            <h1 className="max-w-[9ch] text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.05] tracking-[-0.055em] max-[780px]:max-w-[12ch] max-[780px]:text-[2.7rem]">
              Move from insight to action.
            </h1>
            <p className="mt-7 max-w-[31rem] text-[1.05rem] leading-[1.75] text-[#dce3ff] max-[780px]:hidden">
              Access the tools, shared data, and team context you need to make better decisions.
            </p>
          </div>

          <p className="text-[0.85rem] text-[#cdd7ff] max-[780px]:hidden">
            Secure access for your organization
          </p>
        </aside>

        <div className="flex flex-col p-[clamp(1.75rem,5vw,4rem)] max-[780px]:min-h-[calc(100vh-250px)] max-[780px]:px-7 max-[780px]:pt-6 max-[780px]:pb-10">
          <Link
            className="inline-flex items-center gap-2 self-end text-[0.9rem] font-[650] text-[#63708b] no-underline hover:text-[#30499a] focus-visible:text-[#30499a]"
            to="/"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <div className="mx-auto my-auto w-full max-w-[440px] py-[52px] max-[780px]:pt-11 max-[780px]:pb-4">
            <header className="mb-9">
              <p className="mb-4 text-xs font-extrabold tracking-[0.14em] text-[#526cd3]">
                WELCOME BACK
              </p>
              <h2
                className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em] text-[#16213c]"
                id="login-title"
              >
                Sign in to your account
              </h2>
              <p className="mt-3.5 leading-[1.6] text-[#63708b]">
                Enter your work email and password to continue.
              </p>
            </header>

            <form className="grid gap-[22px]" noValidate onSubmit={handleSubmit(onSubmit)}>
              <label className={fieldClassName}>
                <span>Email address</span>
                <input
                  {...register('email')}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  placeholder="name@company.com"
                  type="email"
                />
                {errors.email ? (
                  <span className="text-[0.8rem] font-semibold text-[#b42318]" id="email-error">
                    {errors.email.message}
                  </span>
                ) : null}
              </label>

              <label className={fieldClassName}>
                <span>Password</span>
                <input
                  {...register('password')}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  type="password"
                />
                {errors.password ? (
                  <span className="text-[0.8rem] font-semibold text-[#b42318]" id="password-error">
                    {errors.password.message}
                  </span>
                ) : null}
              </label>

              <div className="-mt-1 flex items-center justify-between gap-4 text-[0.88rem] max-[420px]:flex-col max-[420px]:items-start">
                <label className="inline-flex items-center gap-[9px] text-[#53617c]">
                  <input
                    {...register('rememberMe')}
                    className="size-4 accent-[#526cd3]"
                    type="checkbox"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  className="cursor-pointer p-0 font-bold text-[#4059bd]"
                  type="button"
                  onClick={() => setNotice('Contact your administrator to reset your password.')}
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="min-h-[54px] cursor-pointer rounded-[11px] bg-[#526cd3] font-extrabold text-white shadow-[0_12px_28px_rgb(82_108_211_/_24%)] transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-[#4059bd]"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>

              {errors.root?.message || notice ? (
                <p
                  className={`-mt-1 rounded-[10px] border px-3.5 py-3 text-[0.85rem] leading-normal ${
                    errors.root?.message
                      ? 'border-[#f2c7c2] bg-[#fff4f2] text-[#8f2117]'
                      : 'border-[#d7dff8] bg-[#f3f6ff] text-[#40517f]'
                  }`}
                  role={errors.root?.message ? 'alert' : 'status'}
                >
                  {errors.root?.message || notice}
                </p>
              ) : null}
            </form>

            <p className="mt-8 text-center text-[0.9rem] text-[#6c7890]">
              Need access?{' '}
              <button
                className="cursor-pointer p-0 font-bold text-[#4059bd]"
                type="button"
                onClick={() => setNotice('Contact your workspace administrator to request access.')}
              >
                Contact your administrator
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
