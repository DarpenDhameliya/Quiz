import React, { ReactNode } from "react";
import bg from "../../asset/images/parallax-section-bg.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";

interface WorkSpaceProps {
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({

  mainbg: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    background: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#000',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },
}));
const WorkSpace: React.FC<WorkSpaceProps> = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.mainbg}
    >
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

export default WorkSpace;
