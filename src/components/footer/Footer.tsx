import Typography from '@mui/material/Typography';
import useHeaderStyles from "../header/HeaderStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsHouseDoor } from "react-icons/bs";
import { BsHouseDoorFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiGridAlt } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";

const Footer: React.FC = () => {
    const [getLocation, setGetLocation] = useState('')
    const classes = useHeaderStyles()
    const location = useLocation();
    const nevigate = useNavigate()

    const handlenevigate = (data: string) => {
        nevigate(`/${data}`)
    }

    useEffect(() => {
        setGetLocation(location.pathname)
    }, [location.pathname])

    return (
        <>
            <div className={classes.mainFooterTest}>
                <div className={`d-flex align-center justify-center h-12 pointer flex-column w-100 ${(getLocation && getLocation === '/category') && classes.selcetdFooter}`} onClick={() => handlenevigate('category')} >
                    {getLocation && getLocation === '/category' ?
                        <BiSolidGridAlt className='fs-15 color-white' />
                        :
                        <BiGridAlt className='fs-15 color-white' />
                    }
                    <Typography className={classes.footerText} >Category</Typography>
                </div>
                <div className={`d-flex align-center pointer flex-column w-100 ${(getLocation && getLocation === '/home') && classes.selcetdFooter}`} onClick={() => handlenevigate('home')} >
                    {getLocation && getLocation === '/home' ? <BsHouseDoorFill className='fs-15 color-white' /> : <BsHouseDoor className='fs-15 color-white' />}
                    <Typography className={classes.footerText} >Home</Typography>
                </div>
                <div className={`d-flex align-center pointer flex-column w-100 ${(getLocation && getLocation === '/profile') && classes.selcetdFooter}`} onClick={() => handlenevigate('profile')}>
                    {getLocation && getLocation === '/profile' ? <BiSolidUser className='fs-15 color-white' /> : <BiUser className='fs-15 color-white' />}
                    <Typography className={classes.footerText} >Profile</Typography>
                </div>
            </div>
        </>
    )
}

export default Footer