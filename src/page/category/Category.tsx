import makeStyles from "@material-ui/core/styles/makeStyles";
import bg from "../../asset/images/banner/main-bg.png";

const usecategoryStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialog-paper": {
            padding: 30,
            background: `url(${bg})`,
            width: 500,
            display: "flex",
            alignItems: "center",
            border: "1px solid #fff",
            "& span": { display: "block", color: '#fff', margin: '15px 0' },
            "& p": {
                textAlign: 'center',
                color: '#d8e91e',
                fontWeight: 600,
                fontSize: 36,
                lineHeight: 1, margin: 0
            },
            "& button": {
                background: '#d8e91e',
                padding: '11px 60px',
                fontSize: 19,
                border: 'none',
                borderRadius: 5,
                fontWeight: 500,
                fontFamily: 'Poppins, sans- serif',
            },
            "& .closeIcon": {
                width: '100%',
                textAlign: 'right',
                color: '#fff',
                fontSize: 30,
                lineHeight: 1,
                marginRight: -20,
                marginTop: -10,
                cursor: 'pointer',
            },

        },
    },
    containerView: {
        maxWidth: "100% !important",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        display: "flex !important",
        alignItems: "center",
        backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 !important",
    },
    setProductpape: {
        textAlign: "left",
        backgroundColor: "var(--white-color) !important",
        display: "flex",
        flexDirection: "column",
        width: "600px",
        borderRadius: "14px !important",
        margin: "0 20px",
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            height: "calc(100vh - 45px)",
            margin: '15px',
        },
    },

    loginscroll: {
        height: "75vh",
        background: "var(--boxbg-color)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        padding: "15px",
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            height: "100%",
        },
    },
    joinexamtermslist: {
        fontSize: '15px',
        [theme.breakpoints.down("xs")]: {
            fontSize: '12px',
        },
    },
    view3loginscroll: {
        height: "75vh",
        background: "var(--boxbg-color)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        padding: "15px",
        position: "relative",
    },
    sliderBorder: {
        borderTop: "1px solid var(--whitebg-color)",
        margin: "15px 0",
    },
    cardmaindiv: {
        borderRadius: "16px",
        border: "1px solid var(--main-color)",
        padding: "10px",
        margin: "10px 0px",
        // boxShadow: 'var(--main-color) 0px 2px 15px 0'
        [theme.breakpoints.down("xs")]: {
            margin: "0px",

        },
    },
    cardimgmain: {
        borderRadius: "16px",
        minWidth: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardimage: {
        width: "40px",
        height: "40px",
        borderRadius: "16px",
    },
    cardmiddle: {
        paddingLeft: "10px",
    },
    cardwintext: {
        paddingBottom: "2px",
        fontSize: "18px !important",
        color: "var(--text-color)",
        fontFamily: "Poppins, sans-serif !important",
    },
    joinexamtop: {
        display: "flex",
        margin: "10px 0 20px",
    },
    setjoinexamimg: {
        width: "60px",
        borderRadius: "10px",
    },
    joinexamdetail: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginLeft: "15px",
    },
    joinexamname: {
        color: "var(--category-color)",
        margin: 0,
    },
    joinexamwin: {
        color: "var(--text-color)",
        margin: 0,
    },
    joinexammiddle: {
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "60%",
        margin: "auto",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            justifyContent: "center",
        },
    },
    joinexambtn: {
        padding: "10px 15px",
        backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
        color: "var(--text-color)",
        borderRadius: "10px",
        borderColor: "transparent",
        marginRight: "10px",
    },
    joinexambtngest: {
        padding: "10px 15px",
        background: "transparent",
        color: "var(--text-color)",
        border: "1px solid var(--gredient-color)",
        borderRadius: "10px",
        marginLeft: "10px",
    },
    joinexamterms: {
        color: "var(--whitebglight-color)",
        paddingInlineStart: "25px",
        marginTop: "60px",
        [theme.breakpoints.down("xs")]: {
            paddingInlineStart: "15px",
        },
    },
    view3joinexamterms: {
        color: "#ffffff82",
        // paddingInlineStart: '10px',
        border: "1px solid #ffffff3b",
        padding: "15px 20px 15px 40px",
        borderRadius: "10px",
        margin: "0",
        boxShadow: "rgb(149 157 165 / 26%) 4px 4px 10px",

        [theme.breakpoints.down("xs")]: {
            padding: "10px 15px 10px 30px",
        },
    },
    profiletop: {
        display: "flex",
        alignItems: "center",
        padding: "15px 0 0 15px",
    },

    profileimg: {
        fontSize: "150px",
        backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
        borderRadius: "50%",
        [theme.breakpoints.down('xs')]: {
            fontSize: "95px",
        },
    },
    profileusermain: {
        marginLeft: "20px",
        display: "flex",
        flexDirection: "column",
    },
    profileuser: {
        margin: "0",
        color: "var(--text-color)",
        // paddingLeft:"20px"
    },
    proileFont: {
        [theme.breakpoints.down('xs')]: {
            fontSize: "15px",
        },
    },
    profiledetail: {
        [theme.breakpoints.down('xs')]: {
            fontSize: "12px",
        },
    },
    profilemiddle: {
        marginTop: "40px",
        marginBottom: "30px",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "70%",
        margin: "auto",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            justifyContent: "center",
        },
    },
    profilejoinbtn: {
        padding: "10px 15px",
        background: "var(--text-color)",
        color: "var(--gredient-color)",
        border: "1px solid var(--gredient-color)",
        borderRadius: "10px",
        width: "180px",
    },
    view3instruction: {
        position: "absolute",
        // bottom: "40%",
        padding: "40px 20px 15px 5px",
    },
    view3li: {
        fontSize: "15px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "13px",
        },
    },
    signupseconfhead: {
        color: 'var(--text-color)',
        fontSize: "18px !important",
        paddingTop: "10px",
        paddingBottom: "10px",

        fontFamily: 'Poppins, sans-serif !important',
    },
    remaintime: {
        fontFamily: 'Poppins, sans-serif !important',
        color: 'var(--text-color)'
    },
    // question: {
    //     color: '#f0f8ff8f',
    //     fontSize: "16px !important",
    //     marginBottom: "20px !important",
    //     fontFamily: 'Poppins, sans-serif !important',
    // },
    // opetionBox: {
    //     gap: '0.75rem',
    //     display: 'grid',
    //     gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
    //     minWidth: '100%',
    //     [theme.breakpoints.down('xs')]: {
    //         gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
    //     },
    // },
    // opetions: {
    //     padding: '10px',
    //     borderRadius: '10px',
    //     border: '1px solid var(--text-color)',
    //     fontSize: "16px",
    //     color: 'var(--text-color)',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     minHeight: "46px"
    // },
    // correctanscss: {
    //     backgroundColor: 'var(--success-color)',
    //     borderColor: 'var(--success-color)'
    // },
    // wronganscss: {
    //     backgroundColor: 'var(--danger-color)',
    //     borderColor: 'var(--danger-color)'
    // },
    usercoinbtn: {
        padding: "10px 15px",
        backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
        color: "var(--text-color)",
        borderRadius: "10px",
        borderColor: "transparent",
        marginTop: "20px",
        width: "170px",
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            width: "120px"
        },
    },

    userlogout: {
        padding: "10px 15px",
        background: "transparent",
        color: "var(--text-color)",
        border: "1px solid #32497f",
        borderRadius: "10px",
        marginTop: "20px",
        width: "200px",
        [theme.breakpoints.down('xs')]: {
            width: "150px"
        },

    }
}));

export default usecategoryStyles;
