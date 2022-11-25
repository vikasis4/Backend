import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // document.documentElement.scrollTo({
    //   top: 0,
    //   left: 0,
    // });
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
}