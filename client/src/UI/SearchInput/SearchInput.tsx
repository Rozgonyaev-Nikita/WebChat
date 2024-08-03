import React, { FC, useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';

interface ISearchInput{
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

export const SearchInput: FC<ISearchInput> = ({inputValue, setInputValue}) => {
  const [searchParams, setSearchParams] = useSearchParams()

    const updateQueryString = (value: string) => {
        // const params = new URLSearchParams(window.location.search);
        // params.set('search', value);
        // window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        setSearchParams({search: value})
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        updateQueryString(value);
    };
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('search') || '';
        setInputValue(query);
    }, []);
    
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange}/>
    </div>
  )
}
