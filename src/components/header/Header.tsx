import Typography from '@mui/material/Typography';
import { FaBitcoin } from "react-icons/fa";
import { SlArrowLeft } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import reward from '../../asset/logo/reward.gif';
import logo from '../../asset/logo/Frame_3-removebg-preview.png';
import useHeaderStyles from './HeaderStyle';
import { useEffect, useState } from 'react';
import { useWallet } from '../../context/walletContext';

const Header: React.FC = () => {
    const [wallet, setWallet] = useState(0)
    const classes = useHeaderStyles();
    const location = useLocation();
    const nevigate = useNavigate();
    const { walletList, walletFetching, walletLoading, walletFetch } = useWallet();
    const userFind = localStorage.getItem('token')
    useEffect(() => {
        const coin = sessionStorage.getItem('coin')
        if (coin) {
            setWallet(Number(coin))
        }
        if (userFind) {
            if (Object.keys(walletList).length === 0) {
                walletFetch();
            }
        }
    }, [])

    return (
        <>
            <div className={classes.mainheader}>
                <div className='flex align-center'>
                    {location.pathname === '/login' &&
                        <div className={classes.lefticon} onClick={() => nevigate(-1)}>
                            <SlArrowLeft />
                        </div>}
                    <img src={logo} alt="logo" style={{ width: "40px" }} />
                </div>
                <div className='flex align-center'>
                    <div className='flex align-center'>
                        <img src={reward} className={classes.logo} alt='logo' />
                        <Typography className={classes.headerReward} >Daily Reward</Typography>
                    </div>
                    <div className={classes.coins}>
                        <FaBitcoin className={classes.coinsicon} />

                        <Typography className='ml-5 fs-12'>{userFind ? (!walletFetching && !walletLoading && Object.keys(walletList).length !== 0 && walletList.data.status === 'ok') && walletList.data.response.balance : wallet} Coins</Typography>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header