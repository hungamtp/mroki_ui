export const reducer = (state, action) => {
  console.log(action.type);
  if (action.type === "SHOW_PRODUCT") {
    const newProducts = action.payload;
    return {
      ...state,
      products: newProducts,
    };
  }
};
