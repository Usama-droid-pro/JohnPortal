// AuthenticationContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../axios/axios.js";
import { baseUrl } from "baseUrl";
import swal from "sweetalert";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [revalidateAuth, setRevalidateAuth] = useState(false);
  const jwt = localStorage.getItem("jwt");
  let config = {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (jwt) {
        try {
          const response = await axios.get(baseUrl + "user/checkAuth", config);
          if (response?.data?.roles) {
            setIsAuthenticated(true);
            setUserRoles(response?.data?.roles);
          }
        } catch (error) {
          if (error?.response?.status == 401) {
            setIsAuthenticated(false);
            setUserRoles([]);
            const willDelete = await swal({
              title: "Session Expired",
              text: "Your session has been expired , Please Login again.",
              icon: "warning",
              dangerMode: true,
            });
            if (willDelete) {
              swal("Logout!", "Logout Successfully!", "success");
              logout();
            }
          }
          if(error.response){

          }
          else if(error.request){
            console.log("server is down")
            
          }
        }
      }
    };

    checkAuthentication();
  }, [revalidateAuth]);

  const logout = () => {
    setIsAuthenticated(false);
    setUserRoles([]);
    localStorage.removeItem("jwt");
  };

  const hasRole = (role) => {
    return userRoles.includes(role);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        userRoles,
        logout,
        hasRole,
        setRevalidateAuth,
        revalidateAuth,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
