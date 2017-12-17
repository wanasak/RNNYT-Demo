import { AppNavigator } from "../components/AppNavigator";
import { NavigationActions } from "react-navigation";

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action = {}) => {
    let nextState;

    switch (action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};
