import React, { useEffect, useRef, useState } from 'react'
import classes from './MarkingOnine.module.css'

interface IMarkingOnineProps {
    children: React.ReactNode;
}

export const MarkingOnine = ({isOnline, children}) => {
    const ref = useRef(null); // Создаём реф для дочернего элемента
    const [width, setWidth] = useState(0); // Состояние для хранения ширины

    useEffect(() => {
        // Проверяем, существует ли элемент
        if (ref.current) {
            // Устанавливаем ширину дочернего элемента
            setWidth(ref.current.offsetWidth);
        }
    }, [children]); // Измеряем ширину снова, если children изменяются
    
  return (
    <div className={classes.imageWrapper}>
        {isOnline && <div className={classes.isOnline}></div>}
        <div ref={ref}>{children}</div>
    </div>
  )
}
