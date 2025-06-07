import { render, screen, fireEvent } from "@testing-library/react";
import LoginModal from "./LoginModal";

describe("LoginModal", () => {
    const onClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders login view by default", () => {
        render(<LoginModal onClose={onClose} />);
        expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("switches to signup view", () => {
        render(<LoginModal onClose={onClose} />);
        fireEvent.click(screen.getByText("Switch to Sign Up"));
        expect(screen.getAllByText("Sign Up")[0]).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    });

    it("switches to reset password view", () => {
        render(<LoginModal onClose={onClose} />);
        fireEvent.click(screen.getByText("Forgot Password?"));
        expect(screen.getAllByText("Reset Password")[0]).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username or Email")).toBeInTheDocument();
    });


    it("calls onClose when close button is clicked", () => {
        render(<LoginModal onClose={onClose} />);
        fireEvent.click(screen.getByText("×"));
        expect(onClose).toHaveBeenCalled();
    });

    it("submits login form", () => {
        render(<LoginModal onClose={onClose} />);
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "user" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByText("Login"));
        // No assertion for side effect, just ensure no crash
    });

    it("submits signup form", () => {
        render(<LoginModal onClose={onClose} />);
        fireEvent.click(screen.getByText("Switch to Sign Up"));
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "user" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "pass" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "pass" } });
        fireEvent.click(screen.getByText("Sign Up"));
    });

    it("submits reset password form", () => {
        render(<LoginModal onClose={onClose} />);
        fireEvent.click(screen.getByText("Forgot Password?"));
        fireEvent.change(screen.getByPlaceholderText("Username or Email"), { target: { value: "user" } });
        fireEvent.click(screen.getByText("Reset Password"));
    });
});