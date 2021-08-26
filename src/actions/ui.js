import { types } from "../types/types";

export const setError=(error)=>({
type:types.uiSetError,
payload:error
})
export const unSetError=()=>({
type:types.uiUnsetError,

})
export const uiStartLoading=()=>({
    type:types.uiStartLoading,
})
export const uiFinishLoading=()=>({
    type:types.uiFinishLoading,
})