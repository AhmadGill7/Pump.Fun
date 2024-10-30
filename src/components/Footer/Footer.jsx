'use client'
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';



const AdsBoxes = ({ name, maketcap, desc, img, index }) => {
    return <Box className={index === 0 ? "animationDiv" : ""} sx={{ width: '400px', minHeight: '180px', display: 'flex', marginTop: '40px', '&:hover': { outline: '2px solid white', cursor: 'pointer', borderRadius: '8px'  } }} >
        <Box style={{ width: '180px', height: 'auto', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
                src={img}
                alt="Ad Image"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px', // optional, for rounded corners
                }}
            />
        </Box>        <Box >
            <Typography sx={{ margin: '20px 0 0 20px', fontSize: '.8em' }}>
                Created By : {name}
            </Typography>
            <Typography sx={{ margin: '0px 0 0 20px', fontSize: '.8em', color: '#ED6C02' }}>
                market cap : {maketcap}
            </Typography>
            <Typography sx={{ margin: '0px 0 0 20px', fontSize: '.8em', color: '#ED6C02' }}>
                replies:3
            </Typography>
            <Typography sx={{ margin: '10px 0 0 20px', fontSize: '.8em' }}>
                <span style={{ fontSize: '1.3em', fontWeight: '700' }}>{name}</span> : {desc}
            </Typography>
        </Box>
    </Box>
}


const Footer = () => {
    let [allMess, setallMess] = useState([
        {
            name: 'Salman',
            maketcap: '42.69k',
            desc: 'Some body goin in water to eater water but wate eat them.',
            img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxocPE9uwKuuDtWqVB8XkpcARe3clvCwA9FFy6aPBOYj1qSBSw3-zNdddydpFz9LlpNLNa6KX47-aGYZGwRQzRwCRB3RF8pAkJ-Gl_OxRbyfOKlXtIoApShv8epV5Vp5DLqjG7PcqnbVA2-lXP1WUK35YysPRC2FrBkygvg4sXMkG0xdYY1PmV853lCQ/w400-h225/nature-collection-best-photos-imgs.jpg',


        },
        {
            name: 'Ali',
            maketcap: '42.69k',
            desc: 'Some body goin in water to eater water but wate eat them.',
            img: 'https://pump.mypinata.cloud/ipfs/Qmb5AQd8KzwLyoZGDuPZnzAiAFTtWXqHuosxQVL4MK4JHQ?img-width=128&img-dpr=2&img-onerror=redirect',


        },
        {
            name: 'Ahmad',
            maketcap: '42.69k',
            desc: 'Some body goin in water to eater water but wate eat them.',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4etM-1d4YVMCNmG527QFZjg0Usr1gOCyiUg&s',


        },
        {
            name: 'Bashir',
            maketcap: '42.69k',
            desc: 'Some body goin in water to eater water but wate eat them.',
            img: 'https://thesavvyimg.co.uk/wp-content/uploads/2020/06/uk-img-doctor-plab-mrcp-mrcs-768x424.jpg',


        }
    ])
    let [whichTab, setwhichTab] = useState('following');
    const [age, setAge] = useState(10)
    let [showSlector2, setshowSlector2] = useState(false)
    let [whichBtn, setwhichBtn] = useState(true);
    let [whichBtn2, setwhichBtn2] = useState(true);
    let boxesShower = useRef()

    const [animationTrigger, setAnimationTrigger] = useState(true);

    useEffect(() => {
        if (animationTrigger) {
            function shuffleArray(array) {
                const newArray = [...array];
                for (let i = newArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            }

            const intervalId = setInterval(() => {
                boxesShower.current.addEventListener("mouseenter", animationHandle);
                boxesShower.current.addEventListener("mouseleave", animationHandleoff);

                if (boxesShower.current && boxesShower.current.children[0]) {
                    { whichBtn ? boxesShower.current.children[0].classList.remove('animationDiv') : null }
                }

                // Shuffle array and trigger re-render
                setallMess((prevArray) => {
                    const shuffledArray = shuffleArray(prevArray);
                    return shuffledArray;
                });

                // Add the animation class back after a short delay to restart animation
                setTimeout(() => {
                    if (boxesShower.current && boxesShower.current.children[0]) {
                        { whichBtn ? boxesShower.current.children[0].classList.add('animationDiv') : null }

                    }
                }, 50); // Adjust delay as needed
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [animationTrigger, whichBtn]);

    function animationHandle() {
        setAnimationTrigger(false)
    }

    function animationHandleoff() {
        setAnimationTrigger(true)
    }



    const handleChange = (event) => {
        setAge(event.target.value); // Update the state with the selected value
    };




    return (
        <Box sx={{ marginTop: "30px", padding: '10px' }}>
            <Box sx={{ display: "flex", cursor: 'pointer', justifyContent: { sm: 'normal', xs: "space-around" } }}>
                <Typography variant="body1" sx={whichTab === 'following' ? { marginLeft: '20px', color: '#fff', borderBottom: '4px solid #1D4ED7' } : { marginLeft: '20px', color: '#6B7280', }} onClick={() => {
                    setwhichTab('following')
                }}> Following</Typography>
                <Typography variant="body1" sx={whichTab === 'termainal' ? { marginLeft: '20px', color: '#fff', borderBottom: '4px solid #1D4ED7' } : { marginLeft: '20px', color: '#6B7280', }} onClick={() => {
                    setwhichTab('termainal')
                }}> Termianl</Typography>
            </Box>
            {whichTab == 'termainal' ? <Box >

                <Box sx={{ display: { sm: "flex", xs: "block" } }}>
                    {
                        whichTab == 'termainal' ?

                            <FormControl sx={{ m: 1, minWidth: 170, margin: "20px 0 0 20px", borderRadius: '15px' }} size="small">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={age} // Bind the select value to the state
                                    label="Age"
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: '#1D4ED7', // Set default background color
                                        color: '#fff',              // Set text color
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',      // Set border color
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',      // Set hover border color
                                        },
                                        '.MuiSvgIcon-root': {
                                            color: '#fff',            // Set color for dropdown arrow
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: '#1D4ED7', // Maintain background when focused/open
                                            color: '#fff',
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: '#1D4ED7', // Change background color of the dropdown
                                                color: '#fff',              // Change text color of the dropdown
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value={10} onClick={() => setshowSlector2(false)}>sort: featured 🔥</MenuItem>
                                    <MenuItem value={20} onClick={() => setshowSlector2(true)}>sort: bump Order</MenuItem>

                                    <MenuItem value={20} onClick={() => setshowSlector2(true)}>sort: creation time</MenuItem>
                                    <MenuItem value={30} onClick={() => setshowSlector2(true)}>sort: last reply</MenuItem>
                                    <MenuItem value={40} onClick={() => setshowSlector2(false)}>sort: currently live</MenuItem>
                                    <MenuItem value={50} onClick={() => setshowSlector2(true)}>sort: market cap</MenuItem>

                                </Select>
                            </FormControl> : null
                    }

                    {
                        showSlector2 ? <FormControl sx={{ m: 1, minWidth: 130, margin: "20px 0 0 20px", borderRadius: '15px' }} size="small">
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age} // Bind the select value to the state
                                label="Age"
                                sx={{
                                    backgroundColor: '#1D4ED7', // Set default background color
                                    color: '#fff',              // Set text color
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',      // Set border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',      // Set hover border color
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: '#fff',            // Set color for dropdown arrow
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#1D4ED7', // Maintain background when focused/open
                                        color: '#fff',
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#1D4ED7', // Change background color of the dropdown
                                            color: '#fff',              // Change text color of the dropdown
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={10}>order: asc</MenuItem>

                                <MenuItem value={20}>order: desc</MenuItem>


                            </Select>
                        </FormControl> : null
                    }


                    <Box sx={{ marginTop: "20px" }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' sx={{ marginLeft: '20px', color: 'white', cursor: 'pointer' }}>
                                Show animation
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={whichBtn
                                    ? { marginLeft: '10px', backgroundColor: '#1D4ED7', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', }
                                    : { marginLeft: '10px', color: 'white', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                }
                                onClick={() => setwhichBtn(true)}
                            >
                                on
                            </Typography>
                            <Typography
                                variant="body1"

                                sx={!whichBtn
                                    ? { marginLeft: '10px', backgroundColor: '#1D4ED7', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                    : { marginLeft: '10px', color: 'white', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                }
                                onClick={() => {
                                    console.log(whichBtn)
                                    setwhichBtn(false)
                                }}
                            >
                                off
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' sx={{ marginLeft: '20px', color: 'white', cursor: 'pointer' }}>
                                Include nsfw:

                            </Typography>
                            <Typography
                                variant="body1"
                                sx={whichBtn2
                                    ? { marginLeft: '10px', backgroundColor: '#1D4ED7', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                    : { marginLeft: '10px', color: 'white', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                }
                                onClick={() => setwhichBtn2(true)}
                            >
                                on
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={!whichBtn2
                                    ? { marginLeft: '10px', backgroundColor: '#1D4ED7', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                    : { marginLeft: '10px', color: 'white', px: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }
                                }
                                onClick={() => setwhichBtn2(false)}
                            >
                                off
                            </Typography>
                        </Box>
                    </Box>


                </Box>
            </Box> : null}

            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'Wrap' }} ref={boxesShower}>
                {
                    allMess?.map((data, index) => {
                        return <AdsBoxes key={index} name={data.name} index={index} maketcap={data.maketcap} desc={data.desc} img={data.img} />

                    })
                }
            </Box>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: '30px', fontSize: '.9em' }}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</Typography>
        </Box>
    )
}

export default Footer