import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    onClick?: () => void;
    children?: React.ReactNode;
    variant?: 'default' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    'aria-label': string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  children,
                                                  variant = 'default',
                                                  size = 'md',
                                                  className = '',
                                                  type = 'button',
                                                  disabled = false,
                                                  'aria-label': ariaLabel,
                                              }) => {
    const variantClass = variant === 'default' ? '' : ` button--${variant}`;
    const sizeClass = size === 'md' ? '' : ` button--${size}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`button${variantClass}${sizeClass} ${className}`}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};