import { LOAD_PROFILE_IMAGE, SAVE_PROFILE_IMAGE } from "../actions/actionTypes";

export default (state = "", action = {}) => {
    switch (action.type) {
        case SAVE_PROFILE_IMAGE:
        case LOAD_PROFILE_IMAGE: {
            return action.payload;
        }
        default:
            return state;
    }
};
