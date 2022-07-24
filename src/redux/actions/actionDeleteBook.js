import { DELETEBOOK } from "../constant";

export const actionDeleteBook = id => {
    return {
        type: DELETEBOOK,
        payload: id
    }
}