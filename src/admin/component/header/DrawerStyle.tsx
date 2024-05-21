import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyleDrawer = makeStyles((theme) => ({
  settypomobile: {
    fontSize: "20px !important",
    fontFamily: " Poppins, sans-serif !important",
    [theme.breakpoints.down("md")]: {
      fontSize: "18px !important",
    },
  },

  setavatrhandle: {
    display: "flex !important",
    justifyContent: "center !important",
  },
  setheaderavtar: {
    height: "75px !important",
    marginTop: "15px !important",
    marginBottom: "15px !important",
  },
  setType: {
    fontSize: "20px",
    color: "white",
    justifyContent: "center",
    display: "flex",
    padding: "10px 10px",
  },
  setTypeLogout: {
    fontSize: "20px",
    color: "white",
    justifyContent: "left",
    display: "flex",
    padding: "10px 10px",
    position: "absolute",
    alignItems: 'center',
    bottom: "10px",
    width: "100%",
    cursor: 'pointer',
    background: 'linear-gradient(45deg, black, transparent)'
  },
  mainDiv: {
    display: "flex",
    alignItems: "center",
  },
  selectedindex: {
    paddingTop: "2px !important",
    paddingBottom: "0px !important",
    "& .Mui-selected": {
      backgroundColor: "#004c99 !important",
      borderRadius: "0 25px 25px 0",
      "&:hover": {
        backgroundColor: "#004c99 !important",
      },
    },
  },
  effectlist: {
    paddingLeft:"28px !important",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,.1) !important",
    //   borderRadius: "0 25px 25px 0",
    },
  },
  appbar: {
    backgroundColor:'#fff !important',
    color:'black !important',
    boxShadow: 'none !important',
  },
  setsidebaricon: {
    color: "white",
    paddingLeft: "15px",
    "&:hover": {
      color: "white",
    },
  },
  setHeadermobile: {
    minHeight:"55px !important",
    [theme.breakpoints.down("md")]: {
      minHeight: "50px !important",
    },
  },
  mobilerightmenu: {
    display: 'flex',
    alignItems: 'center',
  },
  setheading_h5: {
    fontSize:"22px !important",
    marginBottom: '0 !important',
    fontFamily: "Poppins, sans-serif !important",
    [theme.breakpoints.down('sm')]: {
      fontSize: '19px !important',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '19px !important',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '19px !important',
    },
  },
}));

export default useStyleDrawer;