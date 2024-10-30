import { Avatar, Box, Button, LinearProgress, List, ListItem, Typography } from '@mui/material'
import React from 'react'

const CoinsDetails = () => {
    return (
        <div>
            <Box
                sx={{
                    padding: 3,
                    maxWidth: 400,
                    backgroundColor: '#1B1D28',
                    borderRadius: '0px',
                    color: '#9CA3AF',
                }}
            >
                {/* Header Section */}
                <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                    <Avatar
                        src="https://pump.mypinata.cloud/ipfs/QmcrsXmWizh1y1p5UPEtJ84UHQzkN6HcQhhrAdq1no1ChD?img-width=256&img-dpr=2&img-onerror=redirect"
                        sx={{ width: 100, height: 100, marginRight: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">Solana Is Gonna Moon Again</Typography>
                        <Typography variant="body2" color="#9CA3AF">
                            (ticker: SIGMA)
                        </Typography>
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
        </div>
    )
}

export default CoinsDetails
