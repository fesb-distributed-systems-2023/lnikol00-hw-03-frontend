import { useEffect, useRef, useState } from 'react'
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { PlaneList } from '../../interfaces/types';
import axios, { AxiosError } from 'axios';
import { baseURL } from '../../hooks/baseURL';


function Home() {

    const [planes, setPlanes] = useState<PlaneList>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [planesPerPage, setPlanesPerPage] = useState<number>(5);

    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef<null | HTMLParagraphElement>(null)

    const lastPlaneIndex = currentPage * planesPerPage;
    const firstPlaneIndex = lastPlaneIndex - planesPerPage;

    useEffect(() => {
        setErrMsg('');
    }, [planes])

    useEffect(() => {
        const getPlanes = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/api/Airport`)
                setPlanes(data);
            } catch (error) {
                const err = error as AxiosError
                if (!err.response) {
                    setErrMsg("No server response!");
                }
                if (errRef.current)
                    errRef.current.focus();
            }
        }
        getPlanes();
    })

    return (
        <div className='flex flex-col justify-start md:my-[2rem] my-[1.5rem] md:mx-[10rem] mx-[3rem]'>
            <span className='md:text-2xl text-xl'>Currently available planes:</span>
            <p
                ref={errRef}
                className={errMsg ? 'bg-[lightpink] text-[firebrick] font-bold p-2 my-2' : 'absolute left-[-9999px]'}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            {planes.slice(firstPlaneIndex, lastPlaneIndex).map((plane) => {
                return (
                    <Link to={`/planes/${plane.id}`}>
                        <div
                            key={plane.id}
                            className='flex flex-start justify-start flex-col bg-white py-[10px] px-[16px] md:my-[10px] my-[8px] border-[1px] border-black border-solid shadow-md cursor-pointer'
                        >
                            <div>
                                <h1>{plane.model}</h1>
                                <span>Country of origin: {plane.country}</span>
                            </div>
                        </div>
                    </Link>
                )
            })}
            <Pagination
                totalPlanes={planes.length}
                planesPerPage={planesPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default Home
