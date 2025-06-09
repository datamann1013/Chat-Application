// Email validation
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Required field validation
export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
}

// Password match validation
export function passwordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
}

// Password compliance (min 6 chars, at least one letter and one number)
export function isPasswordCompliant(password: string): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}