import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  nameForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    padding: 20,
    display: "block",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  productImg: {
    height: 100,
    width: 100,
  },

  imagePick: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  selectCategory: {
    minWidth: 120,
  },

  saleOff: {
    display: "flex",
  },
}));
