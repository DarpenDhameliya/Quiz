import makeStyles from "@material-ui/core/styles/makeStyles";

const useQuizStyles = makeStyles((theme) => ({
  setcontainer: {
    maxWidth: "100% !important",
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "30px !important",
    zIndex: 1,
    backgroundColor: "#f4f6f9",
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
    marginTop: "25px",
    boxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24) !important',
    [theme.breakpoints.down('md')]: {
      marginTop: '15px !important',
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '15px !important',
      padding: '12px',
    },
  },
  setlabel: {
    fontFamily: "Poppins, sans-serif !important",
    fontSize: "15px !important",
    lineHeight: "20px !important",
    margin: '8px 10px 4px !important',
  },
  settextfield: {
    margin: "5px 0 !important",
    width: "100%",
    "& .MuiInputBase-root": {
      fontFamily: ["Poppins", "sans-serif", "!important"],
    },
    "& .MuiTextField-root": {
      width: "100% !important",
    },
  },
  //   settextfield: {
  //     "& .MuiInputBase-root": {
  //       fontFamily: ["Poppins", "sans-serif", "!important"],
  //     },
  //     "&:hover": {boxShadow: `${theme.shadows[3]}`, border: 0},
  //     "& .MuiTextField-root": {
  //       width: "100% !important",
  //     },
  //   },
  setsendbutton: {
    display: "flex",
    justifyContent: "end",
    marginTop: "7px",
  },
  setsendbtninside: {
    height: "40px",
    padding: "0px 15px !important",
    // backgroundColor: "#6c757d  !important",
    // backgroundColor: "#3c8dbc  !important",
    "&:hover": { backgroundColor: "#6c757dc4  !important" },
  },
  calclebtn: {
    height: "40px",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#FFF  !important",
    color: "#6c757d !important",
    border: "1px solid #6c757d !important",
  },
  tabletd: {
    fontFamily: "Poppins, sans-serif !important",
    padding: "8px !important",
    color: "#202223 !important",
    fontSize: "15px !important",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px !important",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "13px !important",
    },
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
    fontSize: "15px",
    "&:hover": { color: "#3c8dbc !important", backgroundColor: "#d6efef6e" },
  },

  setdeleteincon: {
    color: "#353535e0",
    marginLeft: '5px',
    fontSize: "15px",
    "&:hover": { color: "#7f2121 !important", backgroundColor: "antiquewhite" },
  },
  selectplaceholder: {
    color: '#c8c8c8',
    fontFamily: "Poppins, sans-serif !important",
  },
  collapsBox: {
    borderRadius:'8px',
    padding:"0 8px",
    margin:"8px 0",
    boxShadow:'0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)'
  }
  
}));

export default useQuizStyles;
