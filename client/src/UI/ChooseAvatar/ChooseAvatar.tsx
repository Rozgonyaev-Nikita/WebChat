import React, { DetailedHTMLProps, FC, HTMLAttributes, useRef, useState } from 'react'
import classes from './ChooseAvatar.module.css'
import avatarDefault from '../../images/avatarDefault.webp'
import { INewChat } from '../../components/CreateGroupChat/CreateGroupChat';

interface IChooseAvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    newChat: INewChat;
    setNewChat: (newChat: INewChat) => void;
    className?: string;
}

export const ChooseAvatar: FC<IChooseAvatarProps> = ({ newChat, setNewChat, className }) => {
    // let avatar;
    const imgRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNewChat({...newChat, image: file});
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Создаем URL для отображения изображения
            setSelectedImage(imageUrl);
        }
    };
    const chooseImg = () => {
        imgRef.current.click()
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} ref={imgRef} style={{display: 'none'}}/>
            <img className={`${classes.avatar} ${className}`} src={selectedImage || avatarDefault} alt="картинка" onClick={chooseImg}/> 
        </div>
    )
}
