import React from 'react';
import './InputField.css';


export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'secondary';
    fullModalWidth?: boolean;
    className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    size = 'md',
    variant = 'default',
    fullModalWidth = false,
    className = '',
    ...props
}) => {
    const sizeClass = size === 'md' ? '' : ` inputfield--${size}`;
    const variantClass = variant === 'default' ? '' : ` inputfield--${variant}`;
    const fullModalWidthClass = fullModalWidth ? ' inputfield--full-modal-width' : '';
    return (
        <input
            className={`inputfield${sizeClass}${variantClass}${fullModalWidthClass} ${className}`}
            {...props}
        />
    );
};
