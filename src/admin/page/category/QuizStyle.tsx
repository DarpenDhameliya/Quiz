import makeStyles from "@material-ui/core/styles/makeStyles";

const useQuizStyles = makeStyles((theme) => ({
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "30px !important",
    zIndex: 1,
    backgroundColor: "#f9fafc",
    paddingTop: "80px",
    overflow: "hidden",
    [theme.breakpoints.down('sm')]: {
      paddingTop: '60px !important',
      paddingBottom: '10px !important'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingBottom: '10px !important',
      paddingTop: '60px !important',
    },
  },
  setpageheading: {
    width: "100% !important",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setheading_h4: {
    marginBottom: '0 !important',
    fontFamily: "Poppins, sans-serif !important",
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px !important',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '22px !important',
    },
  },
  setProductpaper: {
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    width: "100% !important",
    borderRadius: "10px",
    marginTop: "25px",
    [theme.breakpoints.down('md')]: {
      marginTop: '15px !important',
      padding: theme.spacing(2),
    },
  },
  setlabel: {
    fontFamily: "Poppins, sans-serif !important",
    fontSize: "15px !important",
    lineHeight: "20px !important",
    margin: '8px 10px 4px !important',
  },
  settextfield: {
    width: "100%",
    margin: '5px 0 !important',
    "& .MuiInputBase-root": {
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
    "& .MuiTextField-root": {
      width: "100% !important",
    },
  },
  setsendbutton: {
    display: "flex",
    justifyContent: "end",
    marginTop: "7px",
  },
  setsendbtninside: {
    height: "40px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc  !important",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbccc  !important" },
  },
  tabletd: {
    fontFamily: "Poppins, sans-serif !important",
    padding: "8px !important",
    color: "#202223 !important",
    fontSize: "16px !important",
  },
  tableth: {
    padding: "8px !important",
    fontWeight: 600,
    color: "#353535 !important",
    fontFamily: "Poppins, sans-serif !important",
  },
  tabletdicon: {
    fontFamily: "Poppins, sans-serif !important",
    justifyContent: "center",
    padding: "8px !important",
    color: "#202223 !important",
  },
  seteditincon: {
    color: "#353535e0",
    fontSize: "17px",
    "&:hover": { color: "#3c8dbc !important", backgroundColor: "#d6efef6e" },
  },

  setdeleteincon: {
    color: "#353535e0",
    marginLeft: '5px',
    fontSize: "17px",
    "&:hover": { color: "#7f2121 !important", backgroundColor: "antiquewhite" },
  },



  setcardeff: {
    "&:hover": { boxShadow: `${theme.shadows[10]}` },
  },

  setImage: {
    height: "140px",
    width: "100%",
    boxShadow: `${theme.shadows[5]}`,
  },

  setlistdiv: {
    display: "flex !important",
    justifyContent: "flex-start !important",
    alignItems: "center",
  },

  settypohead: {
    fontFamily: "Poppins, sans-serif !important",
    fontSize: "18px !important",
    // margin: 0,
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px !important",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "16px !important",
    },
  },

  settypo: {
    fontFamily: "Poppins, sans-serif !important",
    fontWeight: 500,
    fontSize: "15px !important",
    marginLeft: "10px !important",
  },

  setbtn: {
    justifyContent: "left",
    padding: "8px 0px !important",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-around !important",
    },
  },

  setdelbtn: {
    width: "100%",
    fontWeight: 800,
    color: '#111827e0 !important',
    "&:hover": { color: "#7f2121 !important", backgroundColor: "antiquewhite" },
  },

  seteditbtn: {
    width: "100%",
    fontWeight: 800,
    color: '#111827e0 !important',
    "&:hover": { color: "#3c8dbc !important", backgroundColor: "#d6efef !important" },
  },

  setonegried: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1),
    },
  },
  calclebtn: {
    height: "40px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#FFF  !important",
    color: "#3c8dbccc !important",
    border: "1px solid #3c8dbccc !important",
  },
  selectplaceholder: {
    color:'#c8c8c8',
    fontFamily: "Poppins, sans-serif !important",
  }
}));

export default useQuizStyles;
