/* eslint-disable jsx-a11y/alt-text */
import Container from "@mui/material/Container";
import React, { ReactNode } from "react";
import animation5 from "../../asset/images/banner/icon-animation1.png";
import animation1 from "../../asset/images/banner/img-animation1-home3.png";
import animation2 from "../../asset/images/banner/img-animation2-home3.png";
import animation3 from "../../asset/images/banner/img-animation3-home3.png";
import animation4 from "../../asset/images/banner/img-animation4-home3.png";
import animation7 from "../../asset/images/banner/img-animation6-home3.png";
import animation8 from "../../asset/images/banner/img-animation7-home3.png";
import animation6 from "../../asset/images/banner/img-animation8-home3.png";
import animation11 from "../../asset/images/banner/icon-animation2.png";
import workspaceBg from "../../asset/images/banner/main-bg.svg";
import animation12 from "../../asset/images/banner/img-animation20.png";
import "./index.css";

interface WorkSpaceProps {
    children: ReactNode;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
    return (
        <Container
            component="main"
            maxWidth="xl"
            className="workspace-container"
            style={{ background: `url(${workspaceBg})` }}
        >
            <div className="hero-banner">
                <div className="shape-1 shape">
                    <img src={animation1} />
                </div>
                <div className="shape-2 shape">
                    <img src={animation2} />
                </div>
                <div className="shape-3 shape">
                    <img src={animation3} />
                </div>
                <div className="shape-4 shape">
                    <img src={animation4} />
                </div>
                <div className="shape-5 shape">
                    <img src={animation5} />
                </div>
                <div className="shape-6 shape">
                    <img src={animation6} />
                </div>
                <div className="shape-7 shape">
                    <img src={animation7} />
                </div>
                <div className="shape-8 shape">
                    <img src={animation8} />
                </div>
                <div className="shape-9 dots shape" />
                <div className="shape-10 dots shape" />
                <div className="shape-11 shape">
                    <img src={animation11} />
                </div>
                <div className="shape-12 shape">
                    <img src={animation12} />
                </div>
            </div>
            {children}
        </Container >
    );
};

export default WorkSpace;


