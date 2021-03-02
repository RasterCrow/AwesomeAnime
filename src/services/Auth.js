import React, { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext({
  userInfo: null,
});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
/*authrozied requests 
 var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      };

    fetch(url, options).then((response) => {
      console.log(response);
    });
    */
