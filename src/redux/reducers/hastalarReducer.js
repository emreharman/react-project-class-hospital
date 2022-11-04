import actionTypes from "../actions/actionTypes";
/* 
    1. initial (başlangıç) statei oluştur
    2. reducer'ı yaz
*/

const initialState={
    start:false,
    success:false,
    hastalar: [],
    fail: false,
    error: ""
}
// reducer: bir fonksiyondur. İşlevi kendisine gelen
//action'ın type'ına göre ilgili state'te değişiklik yapmaktır.
const hastalarReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.FETCH_HASTALAR_START:
            return{
                ...state,
                start:true
            }
        case actionTypes.FETCH_HASTALAR_SUCCESS:
            return{
                ...state,
                start:false,
                fail:false,
                error:"",
                success: true,
                hastalar: action.payload
            }    
        case actionTypes.FETCH_HASTALAR_FAIL:
            return{
                ...state,
                start: false,
                success:false,
                fail:true,
                error:action.payload
            }    
        default:
            return state
    }
}

export default hastalarReducer
