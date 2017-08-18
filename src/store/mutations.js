import * as types from './mutation-types'
 const mutations={
     [types.SET_SELLER](state,seller){
        state.seller = seller
     },
     [types.SET_HISSHUFFLE](state,Hisshuffle){
        state.Hisshuffle = Hisshuffle
     },
     [types.SET_VERFIY](state,verfiy){
        state.verfiy = verfiy
     }
 }

 export default mutations