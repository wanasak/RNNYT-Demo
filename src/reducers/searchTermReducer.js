import { SERACH_NEWS } from "../actions/actionTypes";

export default (state = "", action = {}) => {
    switch (action.type) {
        case SERACH_NEWS: {
            return action.payload;
        }
        default:
            return state;
    }
};
