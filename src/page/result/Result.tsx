import makeStyles from "@material-ui/core/styles/makeStyles";

const useResultStyles = makeStyles((theme) => ({
    quizPaper: {
        // textAlign: "left",
        // backgroundColor: "var(--white-color) !important",
        // display: "flex",
        // flexDirection: "column",
        // width: "600px",
        // maxWidth: "600px",
        // minWidth: "300px",
        // borderRadius: "16px !important",
        // margin: "0 10px",
        // [theme.breakpoints.down('xs')]: {
        //     margin: '15px',
        // },

        position: "relative",
        textAlign: 'left',
            backgroundColor: 'var(--white-color) !important',
            display: 'flex',
            flexDirection: 'column',
            // margin: '0 20px',
            width:700,
            borderRadius: '15px !important',
            height: '100vh',
            [theme.breakpoints.down('xs')]: {
                height: "calc(100vh - 45px)",
                margin: '15px',
            },
    },

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
    profilemiddle: {
        marginTop: "120px",
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
    joinexambtn: {
        padding: "10px 15px",
        // backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
        color: "var(--text-color)",
        background: '#181818',
        marginRight: "10px",
        borderStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '160px',
        borderRadius: '99px',
        [theme.breakpoints.down("xs")]: {
            width: "120px",
            fontSize: "13px !important"
        },
    },
    profilejoinbtn: {
        padding: "10px 15px",
        backgroundColor: "#181818 !important",
        color: "var(--text-color) !important",
        border: "1px solid #181818 !important",
        borderRadius: "10px !important",
        width: "180px !important",
    },
    joinexambtngest: {
        padding: "10px 15px",
        background: '#181818',
        color: "var(--text-color)",
        marginLeft: "10px",
        borderStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '160px',
        borderRadius: '99px',
        [theme.breakpoints.down("xs")]: {
            width: "120px",
            fontSize: "13px !important"
        },

    },
    resultheading: {
        color: "var(--text-color)",
        fontSize: '25px',
        margin: ' 10px 0',
    },
    resultgif: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    resulthome: {
        borderTop: "1px solid var(--whitebg-color)",
        paddingTop: "30px"
    }
}));

export default useResultStyles;
