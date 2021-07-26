import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
  },
  nameField: {
    marginRight: 10,
  },
  emailField: {
    marginRight: 10,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
  total: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 20,
  },

  products: {
    minWidth: 500,
    marginTop: 20,
    marginBottom: 10,
  },
  size: {
    minWidth: 50,
  },
  sizeField: {
    minWidth: 50,
  },
}));
