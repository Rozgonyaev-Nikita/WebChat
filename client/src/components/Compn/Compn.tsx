import React, { useEffect } from 'react'

export const Compn = () => {
    console.log('консоль!')
    useEffect(() => {
        console.log('эффект!')
    }, [])
  return (
    <div>df</div>
  )
}
