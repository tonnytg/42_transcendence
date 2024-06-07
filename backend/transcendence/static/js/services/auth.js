// auth.js
const signIn = () => {
    console.log("Sign-in function called");
}

const signUp = () => {
    console.log("Sign-up function called");
}

/**
 * Handles authentication actions like sign-in and sign-up by preventing default
 * button behavior and calling the appropriate authentication function.
 *
 * @param {Event} e - The event object.
 */
export const handleAuthActions = (e) => {
    if (e.target.matches("#signInButton")) {
        e.preventDefault();
        signIn();
    } else if (e.target.matches("#signUpButton")) {
        e.preventDefault();
        signUp();
    }
}
