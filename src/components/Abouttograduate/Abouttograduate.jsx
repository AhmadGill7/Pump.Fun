import { newPage } from '@/Slices/usersSlice'
import PumpStore from '@/store/store'
import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'

const Abouttograduate = () => {
    return <Provider store={PumpStore}>
        <ShowAbouttograduate />
    </Provider>
}

const ShowAbouttograduate = () => {
    const [EveryTokens, setEveryTokens] = useState([])
    let [ShowLoading, setShowLoading] = useState(false)
    let dispatch = useDispatch()

    function pageLoaderHandler() {
        dispatch(newPage(1))
    }

    useEffect(() => {
        axios.post('/api/getAllTokens').then((resp) => {
            setEveryTokens(resp.data.AllTokens)
            setShowLoading(true)
        }).catch((error) => {
            console.log(error)
        })

    }, [])


    return (
        <>
            {ShowLoading ? <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, padding: 2, }} className='newScroll'>
                {EveryTokens?.map((data, index) => {
                    return <Link key={index} href={'/Coinsdata/' + data.tokenAddress} onClick={pageLoaderHandler}>
                        <Box sx={{ minWidth: '180px', minHeight: "80px", display: 'flex', background: '#1F2937', alignItems: 'center', px: '.5rem', borderRadius: '10px' }}>
                            <img alt='img' src={data?.file} sx={{ borderRadius: '10px' }} width={70} height={70} />
                            <Box sx={{ pl: '.5rem', fontSize: '.9em' }}>
                                <Typography sx={{ fontSize: '.9em', color: 'white' }}><span style={{ color: 'blue' }}>MC</span> {data?.MarketCap || '4.6k'}</Typography>
                                <Typography sx={{ fontSize: '.9em', color: 'white' }}><span style={{ color: 'blue' }}>V</span> {data?.Volume || '1.1k'}</Typography>
                                <Typography sx={{ fontSize: '.9em', color: 'gray' }}>{Math.floor((new Date() - new Date(data?.createdAt)) / (1000 * 60 * 60))} hours ago</Typography>
                            </Box>
                        </Box>
                    </Link>
                })}
            </Box> : <Box sx={{display:'flex',justifyContent:'center',alignItems:'center' ,width:'100%',overflow:'hidden'}}>
                <CircularProgress sx={{margin:'auto',display:'block'}}/>
            </Box>}
        </>
    )
}

export default Abouttograduate