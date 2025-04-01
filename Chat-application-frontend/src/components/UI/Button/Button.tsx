import React from 'react';
import './Button.css';

interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    variant?: 'default' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  children,
                                                  variant = 'default',
                                                  size = 'md',
                                                  className = '',
                                                  type = 'button',
                                                  disabled = false
                                              }) => {
    const variantClass = variant === 'default' ? '' : ` button--${variant}`;
    const sizeClass = size === 'md' ? '' : ` button--${size}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`button${variantClass}${sizeClass} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};