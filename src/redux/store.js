/* 
    1. store'a konulacak stateler için 
    oluşturulan reducer'ları import et.
    2. import ettiğin reducerları store'a yüklemek
    üzere combine (birleştirme) et
    3. combine edilen state'leri store'a yükle
*/
import {combineReducers,createStore} from 'redux'

import hastalarReducer from "./reducers/hastalarReducer";
import randevularReducer from "./reducers/randevularReducer";
import islemlerReducer from "./reducers/islemlerReducer";

const rootReducer=combineReducers({
    hastalarState:hastalarReducer,
    randevularState:randevularReducer,
    islemlerState:islemlerReducer
})

const store=createStore(rootReducer)

export default store



