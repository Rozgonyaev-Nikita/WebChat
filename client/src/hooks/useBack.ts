import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useBack = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const back = (event) => {
            // Например, проверка нажатия клавиши "Escape"
            if (event.key === "Escape") {
                navigate(-1);
            }
        };

        window.addEventListener('keydown', back);
    
        return () => {
            window.removeEventListener('keydown', back);
        };
    }, [navigate]); // Добавили `navigate` в зависимости
};