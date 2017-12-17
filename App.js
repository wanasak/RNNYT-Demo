import React from "react";
import { Provider } from "react-redux";

import createStore from "./src/createStore";
import AppWithNavigation from "./src/components/AppNavigator";
// import HomeScreen from "./src/components/HomeScreen";

const store = createStore();

export default () => (
    <Provider store={store}>
        <AppWithNavigation />
    </Provider>
);
