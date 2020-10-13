import request from './request'

export default {
    // test
    getClueFlowNodeDef: (data) => request.post('/wx-cyberspace/caseFlowiInfo/getFlowNodeDef', data)
}