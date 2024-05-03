import makeStyles from '@material-ui/core/styles/makeStyles';

const useHeaderStyles = makeStyles((theme) => ({

    mainheader: {
        maxWidth: "100% !important",
        position: "relative",
        zIndex: 1,
        backgroundColor: 'var(--gredient-color)',
        borderRadius: '12px 12px 0 0',
        padding: '5px 15px !important',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "50px",
        // boxShadow: 'rgb(17 24 39 / 5%) 0px 15px 15px',
    },
    lefticon: {
        width: "16px",
        height: "16px",
        cursor: 'pointer',
        padding: "8px",
        color: 'var(--white-color)',
        // backgroundColor: 'var(--whitebglight-color)',
        borderRadius: "10px",
        display: "flex",
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        minWidth: "15px",
        maxWidth: "25px",
        // marginRight: '5px',
        marginBottom: "10px"
    },
    headerReward: {
        color: 'var(--text-color)',
        fontSize: '14px !important',
        paddingLeft: "5px",
        fontFamily: 'Poppins, sans-serif !important',
        [theme.breakpoints.down('xs')]: {
            fontSize:"12px !important",
        },
    },
    coins: {
        display: "flex",
        alignItems: "center",
        padding: "4px 8px",
        backgroundColor: 'var(--white-color)',
        borderRadius: "9999px",
        marginLeft: "8px"
    },
    mainFooter: {
        maxWidth: "100% !important",
        bottom: 0,
        minWidth: '-webkit-fill-available',
        zIndex: 1,
        backgroundColor: 'var(--gredient-color)',
        padding: '5px 4px !important',
        display: "flex",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '0 0 12px 12px',
        height: "50px",
    },
    selcetdFooter: {
        padding: '4px 0px',
        background: 'var(--whitebg-color)',
        borderRadius: '9999px',
        justifyContent: 'center',
    },
    coinsicon: {
        fontSize: "20px !important",
        fill: 'var(--gredient-color)'
    },
    footerText: {
        color: 'var(--text-color)',
        fontSize: "12px !important",
        fontFamily: 'Poppins, sans-serif !important',
    }
}));

export default useHeaderStyles;
