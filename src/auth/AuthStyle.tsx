import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '100% !important',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex !important',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 !important',
        backgroundRepeat: 'no-repeat !important',
        backgroundSize: 'cover !important'
    },

    setProductpape: {
        textAlign: 'left',
        backgroundColor: 'var(--white-color) !important',
        display: 'flex',
        flexDirection: 'column',
        width: '700px',
        borderRadius: '16px !important',
        [theme.breakpoints.down('xs')]: {
            margin: '15px',
        },
    },

    password: {
        marginTop: '18px',
        height: "42px",
        borderRadius: "99px !important",
        border: "1px solid var(--whitebglight-color)",
        color: 'var(--text-color) !important'
    },

    loginscroll: {
        height: '75vh',
        background: 'var(--boxbg-color)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        padding: '15px'
    },

    loginscrollSignup: {
        height: '100vh',
        background: 'var(--boxbg-color)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        padding: '30px 15px 15px',
        [theme.breakpoints.down('xs')]: {
            height: "calc(100vh - 50px)",
            borderRadius: "15px !important",
            padding: '15px',
        },
    },
    question: {
        color: '#f0f8ff8f',
        fontSize: "16px !important",
        marginBottom: "20px !important",
        fontFamily: 'Poppins, sans-serif !important',
    },
    signupheading: {
        color: 'var(--text-color)',
        fontSize: "17px !important",
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: "10px",
        borderBottom: "1px solid var(--whitebglight-color)",
        fontFamily: 'Poppins, sans-serif !important',
    },
    signupheadingview1: {
        color: 'var(--text-color)',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: "10px",
    },
    signupseconfhead: {
        color: 'var(--text-color)',
        fontSize: "18px !important",
        paddingTop: "10px",
        paddingBottom: "10px",

        fontFamily: 'Poppins, sans-serif !important',
    },
    opetions: {
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid var(--text-color)',
        fontSize: "16px",
        color: 'var(--text-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1opetions: {
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #8d8d8d',
        fontSize: "16px",
        color: '#e1e8ed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '#903eff54 0px 30px 60px -12px inset, #9168ff40 0px 18px 36px -18px inset'
    },
    opetionBox: {
        gap: '0.75rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
        minWidth: '100%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
        },
    },
    view1opetionBox: {
        gap: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
        minWidth: '100%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
        },
    },
    correctanscss: {
        backgroundColor: 'var(--success-color)',
    },
    wronganscss: {
        backgroundColor: 'var(--danger-color)'
    },
    remaintime: {
        fontFamily: 'Poppins, sans-serif !important',
        color: 'var(--text-color)'
    },
    signupinq: {
        padding: "5px 15px ",
        background: '#ffffff1c',
        color: 'var(--text-color)',
        display:'flex',
        marginTop: "20px",
        fontSize: '15px',
        [theme.breakpoints.down('xs')]: {
            fontSize: "12px",
        },
    },
    profilejoinbtn: {
        padding: "10px 15px 10px 10px",
        background: 'var(--white-color)',
        color: 'var(--gredient-color)',
        border: "1px solid var(--gredient-color)",
        borderRadius: "10px",
        // width: "180px",
        marginTop: "20px"
    },
    joinexambtn: {
        padding: "10px 15px",
        backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
        color: 'var(--text-color)',
        borderRadius: "9999px",
        borderColor: "transparent",
        marginTop: "20px",
        cursor: 'pointer'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.6,
        zIndex: -1,
    },
    loginscrollview1: {
        height: '75vh',
        overflowY: 'auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        padding: '15px'
    },
    setProductpapeview1: {
        textAlign: 'left',
        background: 'none !important',
        display: 'flex',
        flexDirection: 'column',
        width: '700px',
        borderRadius: '14px !important',
    },
    coinsicon: {
        fontSize: "15px !important",
        fill: 'var(--gredient-color)',
        background: 'var(--text-color)',
        borderRadius: '99999px',
        margin: '0 7px 0 10px'
    },
    view3li: {
        fontSize: "14px",
        lineHeight: "20px",
        [theme.breakpoints.down('xs')]: {
            fontSize: "13px",
        },
    },
    view3joinexamterms: {
        color: "#ffffff82",
        // paddingInlineStart: '10px',
        border: '1px solid #ffffff3b',
        padding: '15px 15px 15px 35px',
        borderRadius: "10px",
        margin: '0',
        marginTop: "30px",
        boxShadow: "rgb(149 157 165 / 26%) 4px 4px 10px",

        [theme.breakpoints.down('xs')]: {
            padding: "10px 15px 10px 30px"
        },
    },
    resulthome: {
        paddingTop: "30px"
    },

    homeBtn: {
        padding: "10px 15px",
        backgroundColor: "#122448 !important",
        color: "var(--text-color) !important",
        border: "1px solid var(--gredient-color) !important",
        borderRadius: "10px !important",
        width: "180px !important",
    },
}));

export default useStyles;