import React, { useState, useEffect } from 'react';
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
    Modal,
    TextField,
    InputAdornment,
    IconButton,
    CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { Provider, useSelector } from 'react-redux';
import PumpStore from '@/store/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { marcketCapData, VOlumeData } from '@/Slices/tokenSlice';
import { newPage } from '@/Slices/usersSlice';

const Newlycreated = () => {
    return <Provider store={PumpStore}>
        <ShowNewlycreated />
        <FilterModal />
    </Provider>
}


const FilterModal = ({ open, handleClose }) => {
    const [marketCap, setMarketCap] = useState({ from: null, to: null });
    const [volume, setVolume] = useState({ from: null, to: null });
    const [holders, setHolders] = useState({ from: null, to: null });
    let dispatch = useDispatch()


    function setFilterValue() {
        dispatch(marcketCapData(marketCap))
        dispatch(VOlumeData(volume))

        handleClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { sm: "600px", xs: "100%" },
                    backgroundColor: "#222222",
                    padding: "20px",
                    borderRadius: "10px",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}>
                    <Typography variant='h6' sx={{ color: "#fff" }}>
                        Filter
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ marginBottom: "10px" }}>
                    <Typography
                        variant='body2'
                        sx={{ color: "#fff", marginBottom: "5px" }}>
                        Market Cap
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            placeholder='From'
                            fullWidth
                            variant='outlined'
                            sx={{
                                marginRight: "10px",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                                "& .MuiInputBase-input": { color: "#fff" },
                            }}
                            InputProps={{
                                sx: { "&::placeholder": { color: "#fff" } },
                            }}
                            value={marketCap.from}
                            onChange={(e) =>
                                setMarketCap({ ...marketCap, from: e.target.value })
                            }
                            required
                            type='number'

                        />
                        <Typography
                            variant='body1'
                            sx={{ color: "#fff", marginRight: "10px" }}>
                            To
                        </Typography>
                        <TextField
                            placeholder='To'
                            fullWidth
                            variant='outlined'
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                                "& .MuiInputBase-input": { color: "#fff" },
                            }}
                            InputProps={{
                                sx: { "&::placeholder": { color: "#fff" } },
                            }}
                            value={marketCap.to}
                            onChange={(e) =>
                                setMarketCap({ ...marketCap, to: e.target.value })
                            }
                            required
                            type='number'

                        />
                    </Box>
                </Box>

                <Box sx={{ marginBottom: "10px" }}>
                    <Typography
                        variant='body2'
                        sx={{ color: "#fff", marginBottom: "5px" }}>
                        Volume
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            placeholder='From'
                            fullWidth
                            variant='outlined'
                            sx={{
                                marginRight: "10px",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                                "& .MuiInputBase-input": { color: "#fff" },
                            }}
                            InputProps={{
                                sx: { "&::placeholder": { color: "#fff" } },
                            }}
                            value={volume.from}
                            onChange={(e) => setVolume({ ...volume, from: e.target.value })}
                            type='number'

                        />
                        <Typography
                            variant='body1'
                            sx={{ color: "#fff", marginRight: "10px" }}>
                            To
                        </Typography>
                        <TextField
                            placeholder='To'
                            fullWidth
                            variant='outlined'
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                                "& .MuiInputBase-input": { color: "#fff" },
                            }}
                            InputProps={{
                                sx: { "&::placeholder": { color: "#fff" } },
                            }}
                            value={volume.to}
                            onChange={(e) => setVolume({ ...volume, to: e.target.value })}
                            required
                            type='number'

                        />
                    </Box>
                </Box>

                <Box sx={{ marginBottom: "10px" }}>
                    <Typography
                        variant='body2'
                        sx={{ color: "#fff", marginBottom: "5px" }}>
                        Holders
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            placeholder='From'
                            fullWidth
                            variant='outlined'
                            sx={{
                                marginRight: "10px",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                                "& .MuiInputBase-input": { color: "#fff" },
                            }}
                            InputProps={{
                                sx: { "&::placeholder": { color: "#fff" } },
                            }}
                            value={holders.from}
                            onChange={(e) => setHolders({ ...holders, from: e.target.value })}
                            required
                        />
                        <Typography
                            variant='body1'
                            sx={{ color: "#fff", marginRight: "10px" }}>
                            To
                        </Typography>
                        <TextField
                            placeholder='To'
                            fullWidth
                            variant='outlined'
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                                "& .MuiInputBase-input": { color: "#fff" },
                            }}
                            InputProps={{
                                sx: { "&::placeholder": { color: "#fff" } },
                            }}
                            value={holders.to}
                            onChange={(e) => setHolders({ ...holders, to: e.target.value })}
                        />
                    </Box>
                </Box>

                <Button
                    variant='contained'
                    sx={{ backgroundColor: "#1D4ED8", marginTop: "10px", float: "right" }}
                    onClick={setFilterValue}>
                    Apply
                </Button>
            </Box>
        </Modal>
    );
};

const ShowNewlycreated = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const handleOpenFilter = () => setFilterOpen(true);
    const handleCloseFilter = () => setFilterOpen(false);
    const [solValue, setSolValue] = useState(0.01);
    const [EveryTokens, setEveryTokens] = useState([])
    const [ShowLoading, setShowLoading] = useState(false)
    let router = useRouter()
    let dispatch = useDispatch()

    let MarketCap = useSelector((store) => {
        return store.token?.marcketCap
    })

    let Volume = useSelector((store) => {
        return store.token?.Volume
    })

    console.log(MarketCap, Volume, '=====>>>>>>>>>>>>>>>>>>>>>>')

    useEffect(() => {
        axios.post('/api/getAllTokens').then((resp) => {
            setEveryTokens(resp.data.AllTokens)
            setShowLoading(true)
        }).catch((error) => {
            console.log(error)
        })

        console.log(EveryTokens)

    }, [])

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    alignItems: "center",
                }}>
                <Box>
                    <Typography variant='h3' sx={{ mt: "30px", color: "#fff" }}>
                        Newly created
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: "#1D4ED8" }}
                        onClick={handleOpenFilter}>
                        Filter
                        <ExpandMoreIcon />
                    </Button>
                    <FilterModal open={filterOpen} handleClose={handleCloseFilter} />
                    <Typography sx={{ marginRight: "10px", color: "#fff" }}>
                        Quick by
                    </Typography>
                    <Box display='flex' alignItems='center' width={150}>
                        <TextField
                            variant="outlined"
                            placeholder="0.01"
                            min="0.01"
                            type="number" // Set input type as number
                            value={solValue} // Bind value to solValue state
                            onChange={(e) => setSolValue(e.target.value)} // Update solValue on change
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img
                                            alt="solana logo"
                                            src="https://pump.fun/_next/image?url=%2Ficons%2Fsol_logo.png&w=16&q=75"
                                            width={25}
                                            height={25}
                                        />
                                    </InputAdornment>
                                ),
                                style: {
                                    fontSize: "1rem",
                                    paddingRight: "8px",
                                    color: "white",
                                    width: "150px",
                                    textAlign: "right",
                                },
                            }}
                            sx={{
                                width: 80,
                                "& .MuiOutlinedInput-root": {
                                    padding: "0 8px",
                                },
                            }}
                        />

                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', colSpan: 2 }}>COIN</TableCell>
                            <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', colSpan: 2 }}>CHART</TableCell>
                            <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', colSpan: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ width: '90px', textAlign: 'left' }}>
                                        <span style={{ fontSize: '1em' }}>HOLDERS</span>
                                    </Box>
                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '.9em' }}>Own</span>
                                    </Box>
                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '.9em' }}>Sol</span>
                                    </Box>
                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '.9em' }}>U.PnL</span>
                                    </Box>
                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '.9em' }}>R.PnL</span>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', colSpan: 5 }}>Threads</TableCell>
                            <TableCell sx={{ color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', colSpan: 1 }}>QUICK BUY</TableCell>

                        </TableRow>
                    </TableHead>
                    {ShowLoading ? <TableBody>
                        {EveryTokens.map((token, index) => {
                            if (
                                Number(MarketCap.from.replace("k", "")) * 1000 <= Number(String(token.MarketCap).replace("k", "")) * 1000 &&
                                Number(MarketCap.to.replace("k", "")) * 1000 >= Number(String(token.MarketCap).replace("k", "")) * 1000 ||
                                Number(Volume.from.replace("k", "")) * 1000 <= Number(String(token.Volume).replace("k", "")) * 1000 &&
                                Number(Volume.to.replace("k", "")) * 1000 >= Number(String(token.Volume).replace("k", ""))
                            ) {
                             return <TableRow onClick={() => {
                                    dispatch(newPage(1))
                                    router.push(`/Coinsdata/${token.tokenAddress}`)
                                }
                                } sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}>
                                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <img src={token?.file} alt={token?.name} style={{ width: 48, height: 48, borderRadius: 8 }} />
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography sx={{ color: '#E2E8F0', fontWeight: 500, fontSize: '.9em' }}>{token?.ticker}</Typography>
                                                    <Typography sx={{ color: '#64748B', fontSize: '.9em', whiteSpace: 'nowrap', textOverflow: 'auto' }}>{token?.name}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>MC</Typography>
                                                        <Typography sx={{ color: '#E2E8F0', fontSize: '13px' }}>{token?.MarketCap}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>V</Typography>
                                                        <Typography sx={{ color: '#E2E8F0', fontSize: '13px' }}>{token?.Volume}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>{token?.lastTrade}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                                    <Typography sx={{ color: '#22C55E', fontSize: '13px' }}>T10 11%</Typography>
                                                    <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>DH 7%</Typography>
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

                                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <Box
                                            className='newScroll'
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                maxHeight: '100px',
                                                overflowY: 'auto',
                                            }}
                                        >
                                            {token?.holders?.map((holder, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Box sx={{ width: '90px', textAlign: 'center', display: 'flex', alignItems: 'left', gap: 1 }}>
                                                        <Typography sx={{ color: '#F97316', mt: '2px', fontSize: '0.9em' }}>
                                                            {holder.name}{holder.tag ? ` (${holder.tag})` : ""}
                                                        </Typography>

                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#E2E8F0', fontSize: '.9em' }}>{holder.percent}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '.9em' }}>{holder.sol}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#EF4444', fontSize: '.9em' }}>{holder.price.down}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#22C55E', fontSize: '.9em' }}>{holder.price.up}</Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </TableCell>

                                    <TableCell
                                        className="newScroll"
                                        sx={{
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                            minWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
                                            maxWidth: '400px',
                                            maxHeight: '100px',
                                            overflowY: 'auto', // Enable vertical scrolling
                                            overflowX: 'hidden', // Prevent horizontal scrolling
                                            paddingTop: '20px', // Optional: remove padding to make space
                                            display: 'block'
                                        }}
                                    >
                                        {token.allComments.map((data, index) => {

                                            return (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: '5px', overflow: 'hidden' }} key={index}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: '5px' }}>
                                                        <img
                                                            alt="img"
                                                            src={data.userImg || 'https://pump.mypinata.cloud/ipfs/QmeSzchzEPqCU1jwTnsipwcBAeH7S4bmVvFGfF65iA1BY1?img-width=16&img-dpr=2&img-onerror=redirect'}
                                                            width={15}
                                                            height={15}
                                                        />
                                                        <Box sx={{ whiteSpace: 'nowrap', background: 'blue', color: 'white', height: '15px', p: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', ml: '5px' }}>
                                                            {data.userId || 26823}
                                                        </Box>
                                                    </Box>
                                                    <Typography sx={{ whiteSpace: 'nowrap', color: 'white', fontSize: '.7em', mt: '2px' }}>
                                                        {data.mainComment}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </TableCell>

                                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
                                            {solValue}
                                        </Button>
                                        <Typography sx={{ color: '#64748B', fontSize: '13px', mt: 0.5 }}>
                                            ~{token?.supply}% supply
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                            } else if (Number(MarketCap.from.replace("k", "")) == 0 && Number(MarketCap.to.replace("k", "")) == 0 && Number(Volume.from.replace("k", "")) == 0 && Number(Volume.from.replace("k", "")) == 0) {
                                return <TableRow onClick={() => router.push(`/Coinsdata/${token.tokenAddress}`)} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}>
                                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <img src={token?.file} alt={token?.name} style={{ width: 48, height: 48, borderRadius: 8 }} />
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography sx={{ color: '#E2E8F0', fontWeight: 500, fontSize: '.9em' }}>{token?.ticker}</Typography>
                                                    <Typography sx={{ color: '#64748B', fontSize: '.9em', whiteSpace: 'nowrap', textOverflow: 'auto' }}>{token?.name}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>MC</Typography>
                                                        <Typography sx={{ color: '#E2E8F0', fontSize: '13px' }}>{token?.MarketCap}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>V</Typography>
                                                        <Typography sx={{ color: '#E2E8F0', fontSize: '13px' }}>{token?.Volume}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>{token?.lastTrade}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                                    <Typography sx={{ color: '#22C55E', fontSize: '13px' }}>T10 11%</Typography>
                                                    <Typography sx={{ color: '#94A3B8', fontSize: '13px' }}>DH 7%</Typography>
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

                                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <Box
                                            className='newScroll'
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                maxHeight: '100px',
                                                overflowY: 'auto',
                                            }}
                                        >
                                            {token?.holders?.map((holder, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Box sx={{ width: '90px', textAlign: 'center', display: 'flex', alignItems: 'left', gap: 1 }}>
                                                        <Typography sx={{ color: '#F97316', mt: '2px', fontSize: '0.9em' }}>
                                                            {holder.name}{holder.tag ? ` (${holder.tag})` : ""}
                                                        </Typography>

                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#E2E8F0', fontSize: '.9em' }}>{holder.percent}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#94A3B8', fontSize: '.9em' }}>{holder.sol}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#EF4444', fontSize: '.9em' }}>{holder.price.down}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: '30px', textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#22C55E', fontSize: '.9em' }}>{holder.price.up}</Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </TableCell>

                                    <TableCell
                                        className="newScroll"
                                        sx={{
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                            minWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
                                            maxWidth: '400px',
                                            maxHeight: '100px',
                                            overflowY: 'auto', // Enable vertical scrolling
                                            overflowX: 'hidden', // Prevent horizontal scrolling
                                            paddingTop: '20px', // Optional: remove padding to make space
                                            display: 'block'
                                        }}
                                    >
                                        {token.allComments.map((data, index) => {

                                            return (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: '5px', overflow: 'hidden' }} key={index}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: '5px' }}>
                                                        <img
                                                            alt="img"
                                                            src={data.userImg || 'https://pump.mypinata.cloud/ipfs/QmeSzchzEPqCU1jwTnsipwcBAeH7S4bmVvFGfF65iA1BY1?img-width=16&img-dpr=2&img-onerror=redirect'}
                                                            width={15}
                                                            height={15}
                                                        />
                                                        <Box sx={{ whiteSpace: 'nowrap', background: 'blue', color: 'white', height: '15px', p: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', ml: '5px' }}>
                                                            {data.userId || 26823}
                                                        </Box>
                                                    </Box>
                                                    <Typography sx={{ whiteSpace: 'nowrap', color: 'white', fontSize: '.7em', mt: '2px' }}>
                                                        {data.mainComment}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </TableCell>

                                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
                                            {solValue}
                                        </Button>
                                        <Typography sx={{ color: '#64748B', fontSize: '13px', mt: 0.5 }}>
                                            ~{token?.supply}% supply
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            }
                        })}
                    </TableBody> : <TableBody>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                            <CircularProgress sx={{ margin: 'auto', display: 'block' }} />
                        </Box>
                    </TableBody>}
            </Table>
            </TableContainer>
        </Box >
    );
};

export default Newlycreated;
