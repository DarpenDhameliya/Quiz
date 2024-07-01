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
    quizPaper: {
        textAlign: 'left',
        backgroundColor: 'var(--white-color) !important',
        display: 'flex',
        flexDirection: 'column',
        // margin: '0 20px',
        width: 700,
        minWidth: 300,
        borderRadius: '15px !important',
        height: '100vh',
        [theme.breakpoints.down('xs')]: {
            height: "calc(100vh - 45px)",
            margin: '15px',
        },
    },
    // middleportion: {
    //     // height: '75vh',
    //     background: 'var(--boxbg-color)',
    //     overflowY: 'auto',
    //     '&::-webkit-scrollbar': {
    //         display: 'none',
    //     },
    //     padding: '15px',
    //     [theme.breakpoints.down('xs')]: {
    //         padding: "12px !important",
    //         height: "100%",
    //     },
    // },
    middleportion: {
        height: 'inherit',
        background: '#000',
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
    slider: {
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

    // extra
    cardimgmain: {
        borderRadius: '16px',
        minWidth: "55px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            width: "50px !important",
        },
    },
    cardimage: {
        width: "60px",
        borderRadius: "16px",
        [theme.breakpoints.down('xs')]: {
            width: "50px !important",
        },
    },
    cardmiddle: {
        display: 'flex',
        justifyContent: 'end',
        width: "100%",
        paddingRight: "10px"
    },
    cardwintext: {
        paddingBottom: "2px",
        fontSize: "16px !important",
        color: 'var(--text-color)',
        [theme.breakpoints.down('xs')]: {
            fontSize: "14px !important",
        },
    },
    cardfee: {
        background: "green",
        borderRadius: "9999px",
        padding: "0px 7px",
        backgroundColor: '#a5ffa54d',
        color: "lawngreen",
        fontSize: "11px !important",
        fontFamily: 'Poppins, sans-serif !important',
    },
    cardpaymain: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)',
        width: "70px",
        borderRadius: '10px',
        height: '60px',
        [theme.breakpoints.down('xs')]: {
            height: "50px !important",
        },
    },


    
}))
export default useHomeStyles;
