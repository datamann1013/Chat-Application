import {fireEvent, render, screen} from "@testing-library/react";
import LoginModal from "./LoginModal";

describe("LoginModal", () => {
    const onClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders login view by default", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("switches to signup view", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        fireEvent.click(screen.getByText("Switch to Sign Up"));
        // Use getAllByText and pick the heading (h2) for "Sign Up"
        const headings = screen.getAllByText("Sign Up");
        // Find the heading element (h2)
        const heading = headings.find(
            el => el.tagName === "H2"
        );
        expect(heading).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Your Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    });

    it("switches to reset password view", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        fireEvent.click(screen.getByText("Forgot Password?"));
        // Use getAllByText and pick the heading (h2) for "Reset Password"
        const headings = screen.getAllByText("Reset Password");
        const heading = headings.find(
            el => el.tagName === "H2"
        );
        expect(heading).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username or Email")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        fireEvent.click(screen.getByText("×"));
        expect(onClose).toHaveBeenCalled();
    });

    it("submits login form", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "user" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "pass" } });
        // Use getAllByText and pick the button for "Login"
        const buttons = screen.getAllByText("Login");
        const button = buttons.find(el => el.tagName === "BUTTON");
        fireEvent.click(button!);
        // No assertion for side effect, just ensure no crash
    });

    it("submits signup form", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        fireEvent.click(screen.getByText("Switch to Sign Up"));
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "user" } });
        fireEvent.change(screen.getByPlaceholderText("Your Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "pass" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "pass" } });
        // Use getAllByText and pick the button for "Sign Up"
        const buttons = screen.getAllByText("Sign Up");
        const button = buttons.find(
            el => el.tagName === "BUTTON"
        );
        fireEvent.click(button!);
    });

    it("submits reset password form", () => {
        render(<LoginModal onClose={onClose} isOpen={true} children={null}/>);
        fireEvent.click(screen.getByText("Forgot Password?"));
        fireEvent.change(screen.getByPlaceholderText("Username or Email"), { target: { value: "user" } });
        // Use getAllByText and pick the button for "Reset Password"
        const buttons = screen.getAllByText("Reset Password");
        const button = buttons.find(
            el => el.tagName === "BUTTON"
        );
        fireEvent.click(button!);
    });
});