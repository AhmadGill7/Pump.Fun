'use client'
import React, { useState } from 'react';
import { Box, Avatar, Typography, List, ListItem, Tabs, Tab, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import Modal from '@mui/material/Modal';
import ReplyIcon from '@mui/icons-material/Reply';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#1B1D28',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height:'100vh'
};

const Comments = () => {
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

   
    return (
        <Box sx={{ width: '100%', backgroundColor: '#2E303A', color: '#9BA2AE', borderRadius: '10px', padding: 2 }}>
            

            {/* Scroll to bottom button */}
            <Button variant="contained" sx={{ marginBottom: 2 ,background:'transparent'}}>
                Scroll to bottom
            </Button>

            {/* Main Post */}
            <Box sx={{ display: 'flex', marginBottom: 2, padding: 2, backgroundColor: '#1B1D28', borderRadius: '10px' }}>
                <Avatar src="https://pump.mypinata.cloud/ipfs/QmcrsXmWizh1y1p5UPEtJ84UHQzkN6HcQhhrAdq1no1ChD?img-width=256&img-dpr=2&img-onerror=redirect" sx={{ width: 56, height: 56, marginRight: 2 }} />
                <Box>
                    <Typography variant="body1">Solana Is Gonna Moon Again (ticker: SIGMA)</Typography>
                    <Typography variant="caption" color="gray">
                        Dq3fi8 (dev) - 10/25/2024, 11:21:04 AM
                    </Typography>
                </Box>
            </Box>

            {/* Thread List */}
            <List>
                {[
                    { user: 'W4TCHKGrkwG', time: '11:21:09 AM', msgId: '#22259415', img: 'https://pump.mypinata.cloud/ipfs/QmTeSLbczRDXpQSAFEDYYxZyJJkR9SfWVFnvyazNWW23GP?img-width=128&img-dpr=2&img-onerror=redirect?img-width=16&img-dpr=2&img-onerror=redirect' },
                    { user: 'CH3CKKhoL3', time: '11:21:09 AM', msgId: '#22259418', img: 'https://pump.mypinata.cloud/ipfs/QmTeSLbczRDXpQSAFEDYYxZyJJkR9SfWVFnvyazNWW23GP?img-width=128&img-dpr=2&img-onerror=redirect?img-width=16&img-dpr=2&img-onerror=redirect' },
                    { user: 'BumperFUN', time: '11:21:14 AM', msgId: '#22259436', img: 'https://pump.mypinata.cloud/ipfs/QmTeSLbczRDXpQSAFEDYYxZyJJkR9SfWVFnvyazNWW23GP?img-width=128&img-dpr=2&img-onerror=redirect?img-width=16&img-dpr=2&img-onerror=redirect' },
                    { user: 'BumperUO10', time: '11:21:15 AM', msgId: '#22259442', img: 'https://pump.mypinata.cloud/ipfs/QmTeSLbczRDXpQSAFEDYYxZyJJkR9SfWVFnvyazNWW23GP?img-width=128&img-dpr=2&img-onerror=redirect?img-width=16&img-dpr=2&img-onerror=redirect' },
                ].map((item, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#2E303A',
                            borderRadius: '8px',
                            marginBottom: 1,
                            padding: 1,
                            color: '#9BA2AE'
                        }}
                    >
                        <Avatar sx={{ width: 30, height: 30, marginRight: 2 }} src={item.img} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2">{item.user}</Typography>
                            <Typography variant="caption" color="gray">
                                {item.time} | {item.msgId} <Button onClick={handleOpen}>reply</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                       <Typography variant='h3' sx={{paddingBottom:'20px'}}>
                                       Add a comment
                                       </Typography>
                                       <input type="text" style={{color:'white',fontSize:'1.3em',width:"100%",height:'100px',margin:'20px,0,0,0',background:'#2A2A3B',border:'1px solid white',borderRadius:'10px'}}/>
                                       <Typography variant='h5' sx={{paddingTop:'20px'}}>
                                       Image (optional)
                                       </Typography>
                                       <Box sx={{width:'60%',height:'200px',margin:'auto',border:"2px dotted white",display:'flex',justifyContent:'center',alignItems:'center',marginTop:"20px",fontSize:'1.2em',color:'white',background:"#050608",borderRadius:'10px',marginBottom:'20px'}}>
                                         Drag & Drop
                                       </Box>
                                       <input type="file" style={{color:'white',fontSize:'1.1em',width:"100%",padding:'10px',background:'#2A2A3B',border:'1px solid white',borderRadius:'10px'}}/>
                                    <Button sx={{width:'100%',padding:'5px 0' ,background:'blue',color:'white',marginTop:'40px'}}>post reply</Button>
                                    <Button sx={{width:'100%',padding:'5px 0' ,background:'transparent',color:'white',marginTop:'10px'}} onClick={handleClose}>[cancle]</Button>
                                    
                                    </Box>
                                </Modal>
                            </Typography>
                        </Box>
                        <IconButton size="small" sx={{ color: '#9BA2AE' }}>
                            <FavoriteIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ marginRight: 2 }}>
                            1
                        </Typography>
                        <IconButton size="small" sx={{ color: '#9BA2AE' }}>
                            <ReplyIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Comments
