import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
});

/**Here we are providing the default value of isLoggedIn, But if we want to use the default value
 *  of the particular variable only if we are not using the provider(being used in App).
 * In real life scenario we want to use provider, for that we can pass the value parameter where we are calling it 
 * in our case in App.
*/
export default AuthContext;