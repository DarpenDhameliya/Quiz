import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import useStyleDrawer from "./DrawerStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { BsList } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { BiCookie, BiBell, BiMoney, BiLineChart } from 'react-icons/bi';

let DrawerOpenWidth = 260;
interface MenuItem {
    to: string;
    icon: JSX.Element;
    name: string;
}
const Sidebar = () => {
    const [mobileSidebaropen, setMobileSidebaropen] = React.useState(false);
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const classes = useStyleDrawer();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMobileSidebar = useCallback(() => {
        setMobileSidebaropen(!mobileSidebaropen);
    }, [mobileSidebaropen]);


    const handleLogout = useCallback(() => {
        navigate('/ad-login')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
    }, [])


    useEffect(() => {
        let data = [
            { to: "/admin/category", icon: <BiCookie />, name: 'Category' },
            { to: "/admin/quiz", icon: <BiBell />, name: 'Quiz' },
            { to: "/admin/question", icon: <BiMoney />, name: 'Questions' },
        ]
        setMenu(data)
    }, [])
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" style={{ background: "#367fa9" }} >
                    <Toolbar className={classes.setHeadermobile}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleMobileSidebar}
                            sx={{
                                marginRight: 3,
                            }}
                        >
                            <BsList />
                        </IconButton>
                        <Typography variant="h5" gutterBottom className={classes.setheading_h5}>
                            quiz
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box className={classes.mobilerightmenu} onClick={handleLogout}>
                            <FaSignOutAlt />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                component="nav"
                sx={{ width: { xs: DrawerOpenWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileSidebaropen}
                    onClose={handleMobileSidebar}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: DrawerOpenWidth,
                        },
                        "& .MuiPaper-root": { backgroundColor: "#222d32" },
                    }}
                >
                    <span className={classes.setType}>
                        {localStorage.getItem("type")?.toUpperCase()}
                    </span>
                    <Divider
                        className="mb-2"
                        variant="middle"
                        style={{ borderColor: "#ffffff47" }}
                    />
                    <List className={classes.selectedindex}>
                        {menu.map((e) => (
                            <ListItemButton
                                key={e.to}
                                component={Link}
                                to={e.to}
                                selected={e.to === location.pathname}
                                className={classes.effectlist}
                            >
                                {e.icon && React.cloneElement(e.icon, { style: { color: "white" } })}
                                <ListItemText primary={e.name} className={classes.setsidebaricon} />
                            </ListItemButton>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </>
    );
};

export default Sidebar;