import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  container: {
    marginTop: 100,
  },
  button: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-around",
  },
}));
