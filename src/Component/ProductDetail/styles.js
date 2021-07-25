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
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  rateDetail: {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  size: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
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
  content1: {
    marginLeft: 4,
  },
  commentContainer: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-around",
  },
}));
