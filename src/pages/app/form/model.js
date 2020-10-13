/*
* 媒体表单 model
*/
import { appView, appAdd, appEdit } from '../service.js';

export default {
    namespace: 'appForm',
    state: {
        formData: {
            id: null,
            name: '',
            key: '',
            val: '',
            runningStatus: null,
        }
    },
    reducers: {
        setFormData(state, { payload }) {
            return {
                ...state,
                formData: payload
            }
        }
    },

    effects: {
        // 媒体详情
        * view(action, { call, put }) {
            const res = yield call(appView, action.payload);
            if(res.code !== 0) return false;
            return res.data;
        },

        // 新建媒体
        * add(action, { call, put }) {
            const res = yield call(appAdd, action.payload);
            if(res.code !== 0) return false;
            return true;
        },

        // 修改媒体
        * edit(action, { call, put }) {
            const res = yield call(appEdit, action.payload);
            if(res.code !== 0) return false;
            return true;
        },

    }
}
