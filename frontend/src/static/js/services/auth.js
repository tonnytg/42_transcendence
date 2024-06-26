export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token !== null;
}

export const signIn = (token) => {
    localStorage.setItem('authToken', token);
    console.log("Sign-in function called, token saved");
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
    if (e.target.id === "signInButton") {
        e.preventDefault();
        signIn();
    } else if (e.target.id === "signUpButton") {
        e.preventDefault();
        signUp();
    }
}