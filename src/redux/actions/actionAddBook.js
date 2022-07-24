import { ADDBOOK } from "../constant";

export const actionAddBook = data => {
    return {
        type: ADDBOOK,
        payload: data
    }
}