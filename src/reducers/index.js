import { combineReducers } from "redux";

import products from "./products";
import categories from "./categories";
import orders from "./orders";
import slides from "./slides";
import ewallets from "./e-wallets";
import qris from "./qris";

export default combineReducers({
  products,
  categories,
  orders,
  slides,
  ewallets,
  qris,
});
