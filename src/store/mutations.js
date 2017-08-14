import * as types from './mutation-types'
 const mutations={
     [types.SET_SELLER](state,seller){
        state.seller = seller
     },
     [types.SET_HISSHUFFLE](state,Hisshuffle){
        state.Hisshuffle = Hisshuffle
     }
 }

 export default mutations