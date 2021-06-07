export default function cartReducer(cartState, action) {
  switch (action.type) {
    case "add": {
      const { id, sku } = action;
      const itemInCart = cartState.find(item => item.sku === sku);
      if (itemInCart) {
        return cartState.map(item =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...cartState, { id, sku, quantity: 1 }];
      }
    }
    case "update":
      const { sku, quantity } = action;
      return quantity === 0
        ? cartState.filter(item => item.sku !== sku)
        : cartState.map(item =>
            item.sku === sku ? { ...item, quantity } : item
          );
    case "empty":
      return [];
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
