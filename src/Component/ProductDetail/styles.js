import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  rateCard: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rateContainer: {
    display: "block",
    alignItems: "center",
  },
  rateDetail: {
    margin: "auto",
    display: "inline-block",
    alignItems: "center",
  },
  size: {
    padding: 0,
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-start",
  },
  commentContainer: {
    marginTop: 10,
  },
  comment: {
    display: "flex",
    marginTop: 5,
    padding: 5,
    justifyContent: "flex-start",
  },
  user: {
    display: "flex",
    alignItems: "start",
  },
  commentDetail: {
    marginLeft: 10,
  },
  content: {
    marginLeft: 4,
  },
}));
