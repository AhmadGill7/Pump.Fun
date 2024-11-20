'use client'
import PumpStore from '@/store/store'
import { Box } from '@mui/material'
import React from 'react'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'


const PageLoader = () => {
    return <Provider store={PumpStore}>
        <ShowPageLoader/>
    </Provider>
}

const ShowPageLoader = () => {

    let changingPage = useSelector(store=>store.user.changingPage)

    return (
        <>
            {changingPage == 1 ? <Box className="navLoading"></Box> : changingPage == 2 ? <Box className="navLoading2"></Box> : null}
        </>

    )
}

export default PageLoader