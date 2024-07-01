import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

interface cardvalue {
  id: number;
  name: string;
  totalPrice: string;
  entryFee: string;
  image: string;
}

interface HomeCardProps {
  data: cardvalue;
  handleclick: (name: number) => void;
}
const useStyles = makeStyles((theme: Theme) => ({
  cardmaindiv: {
    borderRadius: "16px",
    border: "1px solid var(--main-color)",
    padding: "10px",
    margin: "10px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "8px !important",
      margin: "0px",
    },
  },
  cardimgmain: {
    borderRadius: "16px",
    minWidth: "55px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "50px !important",
    },
  },
  cardimage: {
    width: "60px",
    borderRadius: "16px",
    [theme.breakpoints.down("xs")]: {
      width: "50px !important",
    },
  },
  cardmiddle: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
    paddingRight: "10px",
  },
  cardwintext: {
    paddingBottom: "2px",
    fontSize: "16px !important",
    color: "var(--text-color)",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px !important",
    },
  },
  cardfee: {
    background: "green",
    borderRadius: "9999px",
    padding: "0px 7px",
    backgroundColor: "#a5ffa54d",
    color: "lawngreen",
    fontSize: "11px !important",
    fontFamily: "Poppins, sans-serif !important",
  },
  cardpaymain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(180deg, #7b4bff 0%, #a35eff 100%)",
    width: "70px",
    borderRadius: "10px",
    height: "60px",
    [theme.breakpoints.down("xs")]: {
      height: "50px !important",
    },
  },
  playicon: {
    color: "var(--white-color)",
    fontSize: "30px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "22px !important",
    },
  },
}));

const HomeCard: React.FC<HomeCardProps> = ({ data, handleclick }) => {
  const classes = useStyles();
  return (
    <div className="cardSecond">
      <div
        className="d-flex justify-between align-center"
        style={{ width: "100%" }}
      >
        <div className={classes.cardimgmain}>
          <img
            src={data.image}
            alt="quize logo"
            className={classes.cardimage}
          />
        </div>
        <div className={classes.cardmiddle}>
          <div className="d-flex justify-between flex-column align-end">
            <div className="fs-12 examcolor" style={{ color: "#00ffff" }}>
              {data.name}
            </div>
            <div className={classes.cardwintext}>
              Play & Win {data.totalPrice}
            </div>
            <div className={classes.cardfee}>Entry Fee {data.entryFee}</div>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
      <button className="card-btn" onClick={() => handleclick(data.id)}>
        Play
      </button>
    </div>
  );
};

export default HomeCard;
