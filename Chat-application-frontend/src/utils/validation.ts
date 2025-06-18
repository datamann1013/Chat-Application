// Email validation
export function isValidEmail(email: string): boolean {
    // Safe, efficient regex for email validation (avoids super-linear backtracking)
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
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