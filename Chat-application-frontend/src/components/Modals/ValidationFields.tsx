import React from 'react';

interface EmailValidationProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | null;
}

export const EmailValidation: React.FC<EmailValidationProps> = ({ value, onChange, required = true, error }) => (
  <div>
    <input
      type="email"
      name="email"
      placeholder="Your Email"
      value={value}
      onChange={onChange}
      required={required}
      className="modal-input"
      aria-label="Email"
    />
    {error && <div style={{ color: 'red', fontSize: 13 }}>{error}</div>}
  </div>
);

interface PasswordValidationProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | null;
  minLength?: number;
}

export const PasswordValidation: React.FC<PasswordValidationProps> = ({ value, onChange, required = true, error, minLength = 6 }) => (
  <div>
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      className="modal-input"
      aria-label="Password"
    />
    {error && <div style={{ color: 'red', fontSize: 13 }}>{error}</div>}
  </div>
);

interface ConfirmPasswordValidationProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | null;
}

export const ConfirmPasswordValidation: React.FC<ConfirmPasswordValidationProps> = ({ value, onChange, required = true, error }) => (
  <div>
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={value}
      onChange={onChange}
      required={required}
      className="modal-input"
      aria-label="Confirm Password"
    />
    {error && <div style={{ color: 'red', fontSize: 13 }}>{error}</div>}
  </div>
);

interface RequiredTextValidationProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name: string;
  placeholder: string;
  required?: boolean;
  error?: string | null;
  textarea?: boolean;
}

export const RequiredTextValidation: React.FC<RequiredTextValidationProps> = ({ value, onChange, name, placeholder, required = true, error, textarea }) => (
  <div>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="modal-largetextinput"
        aria-label={placeholder}
      />
    ) : (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="modal-input"
        aria-label={placeholder}
      />
    )}
    {error && <div style={{ color: 'red', fontSize: 13 }}>{error}</div>}
  </div>
);

