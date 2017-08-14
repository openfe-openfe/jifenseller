import * as types from './mutation-types'
import {saveHis} from 'common/js/cache'
export const Hisshuffle = function ({commit}, query) {
    commit(types.SET_HISSHUFFLE, saveHis(query))
}