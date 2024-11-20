import { newPage } from '@/Slices/usersSlice'
import PumpStore from '@/store/store'
import { Avatar, Box, Button, LinearProgress, List, ListItem, Typography } from '@mui/material'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'



const CoinsDetails = () => {

    let params = useParams()
    let [TokenDetails, setTokenDetails] = useState({})
    let dispatch = useDispatch()

    useEffect(() => {
        
        axios.post('/api/WhichToken', { tokenAddress: params.TAdress }).then((resp) => {
            setTokenDetails(resp.data.TokenDetail)
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    return (
        <>
            <Box
                sx={{
                    padding: 3,
                    backgroundColor: '#1B1D28',
                    borderRadius: '0px',
                    color: '#9CA3AF',
                    width: "100%",
                    mt: '20px'

                }}
            >
                {/* Header Section */}
                <Box display="flex" alignItems="center" sx={{ marginBottom: 2, width: '100%', }}>
                    <Avatar
                        src={TokenDetails.file}
                        sx={{ width: 100, height: 100, marginRight: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">{TokenDetails.name} (ticker:{TokenDetails?.ticker})</Typography>
                        {/* <Typography variant="body2" color="#9CA3AF">
                            
                        </Typography> */}
                        <Typography variant="h6">{TokenDetails.description}</Typography>
                    </Box>
                </Box>

                {/* Bonding Curve Progress */}
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    bonding curve progress: 8%
                </Typography>
                <LinearProgress variant="determinate" value={8} sx={{ height: 10, borderRadius: 5, marginBottom: 2 }} />
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    When the market cap reaches $71,324 all the liquidity from the bonding curve will be deposited into Raydium and burned. Progression increases as the price goes up.
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    There are 735,097,024 tokens still available for sale in the bonding curve and there is 1.714 SOL in the bonding curve.
                </Typography>

                {/* King of the Hill Progress */}
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    king of the hill progress: 8%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={8}
                    sx={{ height: 10, borderRadius: 5, marginBottom: 2, backgroundColor: '#333', '& .MuiLinearProgress-bar': { backgroundColor: '#ffab00' } }}
                />
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Dethrone the current king at a $34,468 mcap.
                </Typography>

                {/* Holder Distribution */}
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    Holder distribution
                </Typography>
                <List dense sx={{ marginBottom: 2 }}>
                    <ListItem>
                        1. 9erNpz (bonding curve) — 94.19%
                    </ListItem>
                    <ListItem>
                        2. 4TmArf — 2.02%
                    </ListItem>
                    <ListItem>
                        3. BNFYHL — 0.75%
                    </ListItem>
                    <ListItem>
                        4. 4ykRYT — 0.74%
                    </ListItem>
                    <ListItem>
                        5. DubkYm — 0.65%
                    </ListItem>
                    <ListItem>
                        6. BHW6H2 — 0.50%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                    <ListItem>
                        7. 2owriv — 0.27%
                    </ListItem>
                </List>
            </Box>
        </>
    )
}

export default CoinsDetails
