import type from './mutations-type'
export default {
    [type.SET_TEST] (state, test) {
        state.test = test
    }
}