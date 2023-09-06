import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
      const token = localStorage.getItem("token");
      if (!token || token === undefined) {
        setIsLoggedIn(false);
        return navigate("/login");
      }
      setIsLoggedIn(true);
    };
    checkUserToken();
  }, [isLoggedIn, navigate]);
  return <>{isLoggedIn && props.children}</>;
};

export default ProtectedRoute;
