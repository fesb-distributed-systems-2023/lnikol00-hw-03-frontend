import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='text-center m-[50px]'>
            <h2 className='text-[6rem]'>404</h2>
            <p className='py-[20px] text-[35px]'>Page not found</p>
            <span className='text-[18px]'>The page that you are looking for doesnt exist or some other error occured.</span>
            <p className='py-[10x] text-[18px]'><Link to="/">Return back to the home page...</Link></p>
        </div>
    )
}

export default NotFound
