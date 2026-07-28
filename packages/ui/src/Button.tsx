import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, style, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      style={{
        padding: '12px 18px',
        border: 0,
        borderRadius: 10,
        color: '#fff',
        background: '#526cd3',
        cursor: 'pointer',
        fontWeight: 700,
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
