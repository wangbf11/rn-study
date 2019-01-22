import { LOGIN,GET_LIST_DATA } from "./types";
import { handleActions } from "redux-actions";

const defaultState = null;

export const userInfo = handleActions(
    {
        [LOGIN]: (state, { payload }) => {
            // global.realm.write(() => {});
            return { ...state, ...payload };
        }
    },
    defaultState
);
export const listData =handleActions(
    {
        [GET_LIST_DATA]:(state,{payload})=>{
            return {...state, ...payload}
        }
    },defaultState
)
