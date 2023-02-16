import { configureStore } from "@reduxjs/toolkit";
import dataProcessReducer from "./actions/dataProcess";
import customizationReducer from "./customizationReducer";

const index = configureStore({
    reducer: { datas: dataProcessReducer, customization: customizationReducer },
});

export default index;