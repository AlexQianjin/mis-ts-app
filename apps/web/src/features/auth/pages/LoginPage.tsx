import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import type { FormEvent } from 'react';

export function LoginPage() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('The login screen is ready. Connect an authentication endpoint to sign in.');
  };

  return (
    <main className="login-page">
      <section className="login-shell" aria-labelledby="login-title">
        <aside className="login-intro">
          <Link className="brand" to="/" aria-label="MIS home">
            <span className="brand-mark">M</span>
            <span>MIS Workspace</span>
          </Link>

          <div className="login-intro__content">
            <p className="eyebrow eyebrow--light">YOUR WORK, IN ONE PLACE</p>
            <h1>Move from insight to action.</h1>
            <p>
              Access the tools, shared data, and team context you need to make better decisions.
            </p>
          </div>

          <p className="login-intro__footer">Secure access for your organization</p>
        </aside>

        <div className="login-panel">
          <Link className="back-link" to="/">
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <div className="login-form-wrap">
            <header className="login-header">
              <p className="eyebrow">WELCOME BACK</p>
              <h2 id="login-title">Sign in to your account</h2>
              <p>Enter your work email and password to continue.</p>
            </header>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Email address</span>
                <input
                  autoComplete="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  autoComplete="current-password"
                  minLength={8}
                  name="password"
                  placeholder="Enter your password"
                  required
                  type="password"
                />
              </label>

              <div className="form-options">
                <label className="checkbox">
                  <input name="remember" type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button
                  className="link-button"
                  type="button"
                  onClick={() => setMessage('Password recovery is not connected yet.')}
                >
                  Forgot password?
                </button>
              </div>

              <button className="submit-button" type="submit">
                Sign in
              </button>

              {message ? (
                <p className="form-message" role="status">
                  {message}
                </p>
              ) : null}
            </form>

            <p className="login-help">
              Need access?{' '}
              <button
                type="button"
                onClick={() =>
                  setMessage('Contact your workspace administrator to request access.')
                }
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
