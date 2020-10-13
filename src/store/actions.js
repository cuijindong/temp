import type from './mutations-type'
export default {
    axtionSetTest({commit, test}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let commitData = `this is ${test}`
                    commit(type.SET_TEST, commitData)
                    resolve()
                } catch(e) {
                    reject(e)
                }
            }, 1000)
        })
    }
}