import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Paper,
} from '@mui/material';
import Image from 'next/image';
// import { Users, Clock, TrendingUp } from 'lucide-react';

const Newlycreated = () => {
    const tokens = [
        {
            name: 'SCAT',
            fullName: 'SIMONCAT',
            image: 'https://pump.mypinata.cloud/ipfs/QmPN646ShPwhzR6f4Fq4a9sdPDXb8fzy9s8kGY41fuEqhW?img-width=88&img-dpr=2&img-onerror=redirect',
            mc: '$5.7k',
            volume: '$438',
            change: '10.52%',
            lastTrade: '15s ago',
            t10: '8%',
            dh: '3%',
            holders: [
                { name: '6Mzpzb', tag: 'dev', percent: '3.46%', sol: '-', price: { down: '0.00', up: '0.00' } },
                { name: 'orcACR', percent: '2.93%', sol: '-', price: { down: '0.01', up: '0.00' } },
                { name: '33GtNA', percent: '1.00%', sol: '-', price: { down: '0.01', up: '0.00' } },
            ],
            supply: '0.03',
        },
        {
            name: 'ARNGREN',
            fullName: 'ARNGREN...',
            image: 'https://pump.mypinata.cloud/ipfs/QmPN646ShPwhzR6f4Fq4a9sdPDXb8fzy9s8kGY41fuEqhW?img-width=88&img-dpr=2&img-onerror=redirect',
            mc: '$5.9k',
            volume: '$553',
            change: '12.98%',
            lastTrade: '2s ago',
            t10: '10%',
            dh: '0.36%',
            holders: [
                { name: '44MVi7', percent: '9.59%', sol: '5.7', price: { down: '0.00', up: '0.00' } },
                { name: '1RHYNW', tag: 'dev', percent: '0.36%', sol: '0.2', price: { down: '0.01', up: '0.00' } },
            ],
            supply: '0.03',
        },
    ];

    return (
        <TableContainer component={Paper} sx={{ bgcolor: '#0B0E13', boxShadow: 'none', }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>COIN</TableCell>
                        <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>CHART</TableCell>
                        <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>HOLDERS</TableCell>
                        <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '.9em' }}>Own</span> <span style={{ fontSize: '.9em' }}>Sol </span> <span style={{ fontSize: '.9em' }}>U.PnL</span> <span style={{ fontSize: '.9em' }}>R.PnL</span></TableCell>
                        <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>Threads</TableCell>
                        <TableCell align="right" sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>QUICK BUY</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokens?.map((token) => (
                        <TableRow key={token?.name} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}>
                            <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Image src={token?.image} alt={token?.name} style={{ width: 48, height: 48, borderRadius: 8 }} />
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ color: '#E2E8F0', fontWeight: 500 }}>{token?.name}</Typography>
                                            <Typography sx={{ color: '#64748B' }}>{token?.fullName}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>MC</Typography>
                                                <Typography sx={{ color: '#E2E8F0', fontSize: '13px' }}>{token?.mc}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>V</Typography>
                                                <Typography sx={{ color: '#E2E8F0', fontSize: '13px' }}>{token?.volume}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>{token?.lastTrade}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                            <Typography sx={{ color: '#22C55E', fontSize: '13px' }}>T10 {token?.t10}</Typography>
                                            <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>DH {token?.dh}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', width: '20%' }}>
                                <Box sx={{
                                    height: '40px',
                                    bgcolor: 'rgba(34, 197, 94, 0.1)',
                                    borderLeft: '2px solid #22C55E',
                                }} />
                            </TableCell>
                            <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', width: '10%' }}>
                                {token?.holders.map((holder) => (
                                    <Box key={holder.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography sx={{ color: '#F97316', fontSize: '.9em' }}>
                                            {holder.name}
                                        </Typography>
                                        {holder.tag && (
                                            <Typography
                                                sx={{
                                                    color: '#94A3B8',
                                                    fontSize: '12px',
                                                    px: 1,
                                                    py: 0.2,
                                                    bgcolor: 'rgba(148, 163, 184, 0.1)',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {holder.tag}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </TableCell>

                            <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <Box
                                    className='newScroll'
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                        maxHeight: '100px',  // Set max height to 100px
                                        overflowY: 'auto',    // Enable vertical scroll if content overflows
                                    }}

                                >
                                    {token?.holders?.map((holder) => (
                                        <Box
                                            key={holder.name}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Box>
                                                <Box sx={{ display: 'flex', gap: 2, height: '100%', overflow: 'auto' }}>
                                                    <Typography sx={{ color: '#E2E8F0' }}>{holder.percent}</Typography>
                                                    <Typography sx={{ color: '#94A3B8' }}>{holder.sol}</Typography>
                                                    <Typography sx={{ color: '#EF4444' }}>{holder.price.down}</Typography>
                                                    <Typography sx={{ color: '#22C55E' }}>{holder.price.up}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2, height: '100%', overflow: 'auto' }}>
                                                    <Typography sx={{ color: '#E2E8F0' }}>{holder.percent}</Typography>
                                                    <Typography sx={{ color: '#94A3B8' }}>{holder.sol}</Typography>
                                                    <Typography sx={{ color: '#EF4444' }}>{holder.price.down}</Typography>
                                                    <Typography sx={{ color: '#22C55E' }}>{holder.price.up}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2, height: '100%', overflow: 'auto' }}>
                                                    <Typography sx={{ color: '#E2E8F0' }}>{holder.percent}</Typography>
                                                    <Typography sx={{ color: '#94A3B8' }}>{holder.sol}</Typography>
                                                    <Typography sx={{ color: '#EF4444' }}>{holder.price.down}</Typography>
                                                    <Typography sx={{ color: '#22C55E' }}>{holder.price.up}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </TableCell>

                            <TableCell
                                // align="right"
                                className='newScroll'

                                sx={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    width: '100%',
                                    maxHeight: '100px',
                                    overflowY: 'auto', // Enable vertical scrolling
                                    overflowX: 'hidden', // Prevent horizontal scrolling
                                    paddingTop: '20px', // Optional: remove padding to make space
                                    display: 'block'
                                }}
                            >

                                <Box sx={{ display: { xs: 'block', lg: 'flex' }, mt: '5px' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Image alt='img' src='https://pump.mypinata.cloud/ipfs/QmeSzchzEPqCU1jwTnsipwcBAeH7S4bmVvFGfF65iA1BY1?img-width=16&img-dpr=2&img-onerror=redirect' width={15} height={15} />
                                        <Box sx={{ background: 'blue', color: 'white', height: '15px', p: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>8ttvrx</Box>
                                    </Box>
                                    <Typography sx={{ color: 'white', fontSize: '.7em', ml: '5px', textAlign: 'left', mt: '3px' }}>Saome sdj akma siisd e  cjdd a  ciasd asdjkm</Typography>
                                </Box>



                            </TableCell>
                            <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: 'rgba(34, 197, 94, 0.1)',
                                        color: '#22C55E',
                                        '&:hover': {
                                            bgcolor: 'rgba(34, 197, 94, 0.2)',
                                        },
                                        minWidth: '100px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    0.01
                                </Button>
                                <Typography sx={{ color: '#64748B', fontSize: '13px', mt: 0.5 }}>
                                    ~{token?.supply}% supply
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Newlycreated;
