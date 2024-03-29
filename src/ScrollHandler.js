import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
    
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0,0);
    }, [location])
      
    return null
}

export default ScrollHandler