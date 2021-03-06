import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    color: "#d6d6d6",
    background: "#333333",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },

  cart: {
    marginRight: "50px",
  },
  menuList: {
    marginTop: 40,
    marginRight: 100,
  },
  formSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginRight: 10,
  },
}));
