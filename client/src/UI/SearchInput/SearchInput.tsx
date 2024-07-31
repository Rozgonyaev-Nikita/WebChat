import React, { FC, useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";


export const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');

    const updateQueryString = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('search', value);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        updateQueryString(value);
    };
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query') || '';
        setInputValue(query);
    }, []);
    
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange}/>
    </div>
  )
}
