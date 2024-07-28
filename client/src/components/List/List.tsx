import React, { FC } from 'react'
import classes from './List.module.css'

interface IListProps<T> {
    items: T[];
    renderItem: (items: T, key?: any) => React.ReactNode;
}

export default function List<T> ({items, renderItem}: IListProps<T>) {
  return (
    <div className={classes.list}>
        {items.map(renderItem)}
    </div>
  )
}
