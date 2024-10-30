import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Abouttograduate = () => {

    let aboutToGraduate = [
        { id: 1, name: "Bitcoin", image: "coin1.png", mc: "$800B", volume: "$35B", timeAgo: "1 hour ago" },
        { id: 2, name: "Ethereum", image: "coin2.png", mc: "$380B", volume: "$18B", timeAgo: "2 hours ago" },
        { id: 3, name: "Cardano", image: "coin3.png", mc: "$70B", volume: "$1.5B", timeAgo: "5 hours ago" },
        // Add more coins up to 20 here...
        { id: 4, name: "Solana", image: "coin4.png", mc: "$50B", volume: "$3B", timeAgo: "10 hours ago" },
        { id: 5, name: "Ripple", image: "coin5.png", mc: "$30B", volume: "$1B", timeAgo: "12 hours ago" },
        { id: 6, name: "Litecoin", image: "coin6.png", mc: "$15B", volume: "$500M", timeAgo: "15 hours ago" },
        { id: 7, name: "Polkadot", image: "coin7.png", mc: "$10B", volume: "$250M", timeAgo: "18 hours ago" },
        { id: 8, name: "Dogecoin", image: "coin8.png", mc: "$8B", volume: "$200M", timeAgo: "20 hours ago" },
        { id: 9, name: "Chainlink", image: "coin9.png", mc: "$5B", volume: "$150M", timeAgo: "1 day ago" },
        { id: 10, name: "Shiba Inu", image: "coin10.png", mc: "$2B", volume: "$100M", timeAgo: "1 day ago" },
        // Continue adding items until you reach 20...
    ]

    let scrollerKaData = [
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },

        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },
        {
            time: '5h ago',
            img: 'https://pump.mypinata.cloud/ipfs/QmZJKFtE77rhp9peVWdKGQo3sqUzvqYWUxYMKixBNq3y1P?img-width=62&img-dpr=2&img-onerror=redirect',
            MC: '102.55k',
            V: '60.4k'

        },

    ]

    return (
        <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, padding: 2, }} className='newScroll'>
            {scrollerKaData.map((data) => {
                return <Box key={data?.time} sx={{ minWidth: '180px', minHeight: "80px", display: 'flex', background: '#1F2937', alignItems: 'center', px: '.5rem', borderRadius: '10px' }}>
                    <img alt='img' src={data?.img} sx={{ borderRadius: '10px' }} width={70} height={70} />
                    <Box sx={{ pl: '.5rem', fontSize: '.9em' }}>
                        <Typography sx={{ fontSize: '.9em', color: 'white' }}><span style={{ color: 'blue' }}>MC</span> {data?.MC}</Typography>
                        <Typography sx={{ fontSize: '.9em', color: 'white' }}><span style={{ color: 'blue' }}>V</span> {data?.V}</Typography>
                        <Typography sx={{ fontSize: '.9em', color: 'gray' }}>{data?.time}</Typography>
                    </Box>
                </Box>
            })}
        </Box>
    )
}

export default Abouttograduate