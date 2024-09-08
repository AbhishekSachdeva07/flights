import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const [time, setTime] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <>
            <span>Error</span><br />
            <span>Navigating back to home in {time} sec...</span>
        </>
    );
};

export default Error;
