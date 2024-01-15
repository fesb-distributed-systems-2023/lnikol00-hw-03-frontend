import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import { Plane } from '../../interfaces/types';
import { baseURL } from '../../hooks/baseURL';
import axios, { AxiosError } from 'axios';

function PlaneDetails() {

    const [plane, setPlane] = useState<Plane>()
    const params = useParams();

    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef<null | HTMLParagraphElement>(null)

    useEffect(() => {
        setErrMsg('');
    }, [plane])

    useEffect(() => {
        const getSinglePlane = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/api/Airport/${params.id}`)
                setPlane(data);
            }
            catch (error) {
                const err = error as AxiosError
                if (!err.response) {
                    setErrMsg("No server response!")
                }
                else if (err.response?.status === 404) {
                    setErrMsg(`${err.response.data}`)
                }
                if (errRef.current)
                    errRef.current.focus();
            }
        }
        getSinglePlane();
    }, [params])

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            if (window.confirm("Are you sere you want to delete this plane?")) {
                await axios.delete(`${baseURL}/api/Airport/${params.id}`)
                console.log("Plane deleted")
                navigate("/")
            }
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 404) {
                setErrMsg(`${err.response.data}`)
            }
            if (errRef.current)
                errRef.current.focus();
        }
    }

    const handleUpdate = () => {
        navigate(`/update/${params.id}`)
    }

    return (


        <div className='flex md:flex-row flex-col justify-start items-center md:p-[5rem] p-[1.5rem] '>
            <p
                ref={errRef}
                className={errMsg ? 'bg-[lightpink] text-[firebrick] font-bold p-2 my-2 md:w-screen w-[80%]' : 'absolute left-[-9999px]'}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            {
                plane &&
                <>
                    <div className='md:w-[50%] w-[100%]'>
                        <img
                            src={plane?.image}
                            alt='test'
                            className='w-[100%] md:h-[450px] h-[200px]'
                        />
                    </div>
                    <div className='flex justify-center items-center flex-col md:w-[50%] w-[100%] md:px-[2em] md:py-[0em] py-[0.75em] md:gap-5 gap-3'>
                        <span className='text-xl'><b>Model: </b>{plane?.model}</span>
                        <span className='text-xl'><b>Year: </b>{plane?.year}</span>
                        <span className='text-xl'><b>Country: </b>{plane?.country}</span>
                        <span className='text-xl'><b>Capacity: </b>{plane?.capacity}</span>
                        <span className='text-xl'><b>Type: </b>{plane?.type}</span>
                        <span className='text-xl'><b>Captain: </b>{plane?.captain}</span>
                        <div className='flex justify-center items-center gap-10 text-xl'>
                            <div
                                onClick={handleDelete}
                                className='flex justify-center items-center bg-[red] text-white w-10 h-8 rounded-lg p-1 cursor-pointer'>
                                <AiIcons.AiOutlineDelete />
                            </div>
                            <div onClick={handleUpdate} className='text-[green] cursor-pointer'>
                                <FaIcons.FaPen />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >


    )
}

export default PlaneDetails
