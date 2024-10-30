import React, { useState } from 'react';
import {
    Box,
    Typography,
    Switch,
} from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from '@mui/material';
import Image from 'next/image';


const Trades = () => {
    const [followingFilter, setFollowingFilter] = useState(false);
    const [sizeFilter, setSizeFilter] = useState(false);

    const transactions = [
        { account: 'Yigitk', type: 'buy', sol: 0.2000, aai: '6.85m', time: '3m ago', hash: '2eeHBi' },
        { account: 'Aer64g', type: 'sell', sol: 0.0298, aai: '1.03m', time: '12m ago', hash: '5ToWjm' },
        { account: '5Nf6Am', type: 'buy', sol: 0.0574, aai: '1.98m', time: '12m ago', hash: 'zqz51E' },
        { account: 'Aer64g', type: 'buy', sol: 0.0297, aai: '1.03m', time: '12m ago', hash: '2uPhk5' },
        { account: '7B2stm', type: 'sell', sol: 2.3390, aai: '75.17m', time: '13m ago', hash: '4v3ujL' },
        { account: '7B2stm', type: 'buy', sol: 2.3390, aai: '75.17m', time: '13m ago', hash: '4G9HMv' },
        { account: 'Strwarsboy', type: 'buy', sol: 0.5000, aai: '17.59m', time: '13m ago', hash: '3aNQiv' },
    ];

    const tableStyles = {
        backgroundColor: '#2E303A',
        '& th': {
            color: '#9CA3AF',
            fontWeight: 'normal',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '8px 16px',
        },
        '& td': {
            color: '',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '8px 16px',
        },
    };


    return (
        <Box sx={{ paddingLeft: '20px' }}>
            <Box sx={{
                p: 2,
                bgcolor: '#1B1D28',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <Typography sx={{
                        color: '#94A3B8',
                        fontSize: '14px',
                    }}>
                        Filter by following
                    </Typography>

                    <Switch
                        size="small"
                        checked={followingFilter}
                        onChange={(e) => setFollowingFilter(e.target.checked)}
                        sx={{
                            padding: 0.5,
                            '& .MuiSwitch-track': {
                                backgroundColor: followingFilter ? '#3b82f6' : '#1e293b',
                                opacity: 1,
                                borderRadius: '10px',
                                transition: 'background-color 0.3s ease',
                            },
                            '& .MuiSwitch-thumb': {
                                backgroundColor: followingFilter ? '#fff' : '#94a3b8',
                                width: 12,
                                height: 12,
                                margin: '2px',
                                boxShadow: followingFilter ? '0 0 6px rgba(0, 0, 0, 0.2)' : 'none',
                                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            },
                            '& .MuiSwitch-switchBase': {
                                '&.Mui-checked': {
                                    transform: 'translateX(16px)',
                                    '& .MuiSwitch-thumb': {
                                        backgroundColor: '#fff',
                                    },
                                    '& + .MuiSwitch-track': {
                                        backgroundColor: '#3b82f6',
                                    },
                                },
                            },
                        }}
                    />

                    <Typography sx={{
                        color: '#64748B',
                        fontSize: '14px',
                        ml: 1,
                    }}>
                        connect your wallet to filter
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <Typography sx={{
                        color: '#94A3B8',
                        fontSize: '14px',
                    }}>
                        Filter by size
                    </Typography>

                    <Switch
                        size="small"
                        checked={sizeFilter}
                        onChange={(e) => setSizeFilter(e.target.checked)}
                        sx={{
                            padding: 0.5,
                            '& .MuiSwitch-track': {
                                backgroundColor: '#1e293b',
                                opacity: 1,
                                borderRadius: '10px',
                            },
                            '& .MuiSwitch-thumb': {
                                backgroundColor: '#94a3b8',
                                width: 12,
                                height: 12,
                                margin: '2px',
                            },
                            '& .Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    backgroundColor: '#1e293b',
                                    opacity: 1,
                                },
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: '#3b82f6',
                                },
                            },
                            '& .MuiSwitch-switchBase': {
                                '&.Mui-checked': {
                                    transform: 'translateX(16px)',
                                },
                            },
                        }}
                    />

                    <Chip
                        label="0.05"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(55, 65, 81, 1)',
                            color: '#fff',
                            height: '20px',
                            borderRadius: '4px',
                            '& .MuiChip-label': {
                                padding: '0 6px',
                                fontSize: '12px',
                            },
                        }}
                    />

                    <Typography sx={{
                        color: '#64748B',
                        fontSize: '14px',
                    }}>
                        (3 trades of size greater than 0.05 SOL)
                    </Typography>
                </Box>
            </Box>


            {/* Table  */}

            <TableContainer component={Paper} sx={{ backgroundColor: '#2E303A', boxShadow: 'none', marginTop: '20px' }}>
                <Table sx={tableStyles}>
                    <TableHead>
                        <TableRow>
                            <TableCell>account</TableCell>
                            <TableCell>type</TableCell>
                            <TableCell>SOL</TableCell>
                            <TableCell>AAI</TableCell>
                            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                date
                            </TableCell>
                            <TableCell>transaction</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions?.map((row) => (
                            <TableRow
                                key={row?.hash}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#2E303A',
                                    },
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Image alt={row?.account} src='https://pump.mypinata.cloud/ipfs/QmeSzchzEPqCU1jwTnsipwcBAeH7S4bmVvFGfF65iA1BY1?img-width=16&img-dpr=2&img-onerror=redirect' width={20} height={20} />
                                        <Chip
                                            label={row?.account}
                                            sx={{
                                                height: '22px',
                                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                                borderRadius: '4px',
                                                '& .MuiChip-label': {
                                                    px: 1,
                                                    fontSize: '13px',
                                                    color: '#E2E8F0',
                                                },
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell sx={{
                                    color: row?.type === 'buy' ? '#22C55E' : '#EF4444'
                                }}>
                                    {row?.type}
                                </TableCell>
                                <TableCell sx={{ color: '#94A3B8' }}>{row?.sol.toFixed(4)}</TableCell>
                                <TableCell sx={{ color: '#94A3B8' }}>{row?.aai}</TableCell>
                                <TableCell sx={{ color: '#94A3B8' }}>{row?.time}</TableCell>
                                <TableCell sx={{ color: '#94A3B8' }}>{row?.hash}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Trades
