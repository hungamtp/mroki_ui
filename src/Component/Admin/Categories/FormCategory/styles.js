import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  container: {
    marginTop: 20,
  },
  root: {
    height: 480,
    flexGrow: 1,
    maxWidth: 500,
  },
  button: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 10,
  },
  parentCate: {
    marginTop: 10,
    minWidth: 200,
  },
}));
