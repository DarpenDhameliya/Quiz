import React from "react";
import Container from "@mui/material/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from 'prop-types';
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';

const useStyle = makeStyles((theme) => ({
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
    setpageheading_back: {
        width: "100% !important",
        margin: "auto",
        display: "flex",
        alignItems: "center",
    },
    setaddproheaderarrow: {
        border: "1px solid #202223",
        backgroundColor: "transparent !important",
        marginRight: "20px",
        marginLeft: "4px",
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
}))


interface CommonContainerProps {
    destination?: string;
    heading: string;
    children?: React.ReactNode;
    btnName?: string;
    btnreq?: boolean;
    backLink?: string;
    btnpre?: boolean;
}

const CommonContainer: React.FC<CommonContainerProps> = React.memo(({
    destination,
    heading,
    children,
    btnName,
    btnreq = false,
    backLink,
    btnpre = false,
}) => {
    const classes = useStyle();

    return (
        <Container
            component="main"
            maxWidth="xl"
            className={classes.setcontainer}
        >
            <div className={btnpre ? classes.setpageheading_back : classes.setpageheading}>
                <Typography variant="h4" gutterBottom className={classes.setheading_h4}>
                    {heading}
                </Typography>
            </div>
            {children}
        </Container>
    );
});


export default CommonContainer;