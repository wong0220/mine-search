import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import MineSearch from "./MineSearch";

ReactDOM.render(
  <Provider store={store}>
    <MineSearch />
  </Provider>,
  document.getElementById("root")
);
