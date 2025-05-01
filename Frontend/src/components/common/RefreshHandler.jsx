import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      const isAuthPage = ["/", "/login", "/register"].includes(pathname);
      if (isAuthPage) {
        navigate("/", { replace: false });
      }
    }
  }, [pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
