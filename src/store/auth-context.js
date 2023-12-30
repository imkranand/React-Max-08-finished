import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email,password)=>{}
});

/**Here we are providing the default value of isLoggedIn, But if we want to use the default value
 *  of the particular variable only if we are not using the provider(being used in App).
 * In real life scenario we want to use provider, for that we can pass the value parameter where we are calling it 
 * in our case in App.
*/

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoggedInInfo = localStorage.getItem('isLoggedIn');
        if (storedLoggedInInfo === '1') {
          setIsLoggedIn(true);
        }
      }, [])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>{props.children}</AuthContext.Provider>
    );
}


export default AuthContext;