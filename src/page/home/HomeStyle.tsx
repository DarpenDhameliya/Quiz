import makeStyles from '@material-ui/core/styles/makeStyles';

const useHomeStyles = makeStyles((theme) => ({
    containerView: {
        maxWidth: '100% !important',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex !important',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden',
        padding: '0 !important',
    },
    setProductpape: {
        textAlign: 'left',
        backgroundColor: 'var(--white-color) !important',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 20px',
        maxWidth: 600,
        minWidth: 300,
        borderRadius: '15px !important',
        [theme.breakpoints.down('xs')]: {
            height: "calc(100vh - 45px)",
            margin: '15px',
        },
    },
    loginscroll: {
        height: '75vh',
        background: 'var(--boxbg-color)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        padding: '15px',
        [theme.breakpoints.down('xs')]: {
            padding: "12px !important",
            height: "100%",
        },
    },
    sliderdiv: {
        display: "flex !important",
        justifyContent: "center",
        padding:"0 20px 0 0"
    },
    slidertext: {
        margin: "0",
        color: 'var(--white-color)',
        padding: "2px 20px",
        border: "2px solid var(--main-color)",
        borderRadius: "10px",
        fontWeight: 400,
        fontFamily: 'Poppins, sans-serif !important', width: 'max-content'
    },
    sliderBorder: {
        borderTop: "1px solid var(--whitebg-color)",
        margin: "15px 0"
    },

}))
export default useHomeStyles;
