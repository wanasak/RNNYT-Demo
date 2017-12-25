import { AsyncStorage } from "react-native";

import { LOAD_PROFILE_IMAGE, SAVE_PROFILE_IMAGE } from "./actionTypes";

export const loadProfileImage = () => {
    return {
        type: LOAD_PROFILE_IMAGE,
        payload: AsyncStorage.getItem("profileImage").then(image => {
            return image ? image : "";
        })
    }
}

export const saveProfileImage = async image => {
    await AsyncStorage.setItem("profileImage", image);

    return {
        type: SAVE_PROFILE_IMAGE,
        payload: image
    };
}