/*
* 媒体列表
*/
import { appList, appDelete, appResume, appPaused } from '../service.js';
const AppListModel = {
    namespace: 'appList',
    state: {
        dataList: [],
        total: 0,     // 总条数
        copyData: {},     // 复制的数据
    },
    reducers: {
        setList(state, { payload }) {
            return {
                ...state,
                total: payload.total,
                dataList: payload.list,
            };
        },
        // 设置复制的数据
        setCopyData(state, { payload }) {
            return {
              ...state,
              copyData: payload
            }
        },
    },
    effects: {
        // 列表数据
        * getList({ payload }, { call, put }) {
            let res = yield call(appList, payload);
            if (res.code !== 0) return false;
            if (!res.data || !res.data.data) res.data = { data: [], pager: { itemCount: 0 } }
            yield put({
                type: 'setList',
                payload: {
                    list: res.data.data || [],
                    total: res.data.pager.itemCount || 0
                }
            });
            return res.data.data || [];
        },

        // 删除
        * delete({ payload }, { call, put }) {
            let res = yield call(appDelete, payload);
            if(res.code !== 0) return false;
            return true;
        },

        // 开始
        * resume({ payload }, { call, put }) {
            let res = yield call(appResume, payload);
            if(res.code !== 0) return false;
            return true;
        },

        // 暂停
        * paused({ payload },{ call, put }) {
            let res = yield call(appPaused, payload);
            if(res.code !== 0) return false;
            return true;
        },

        // 重置数据
        * resetList(action, { call }) {
            yield put({
                type: 'setList',
                poyload: { list: [], total: 0 }
            });
        },

        // copy 数据
        * copy(action, { call, put }) {
          yield put({
            type: 'setCopyData',
            payload: action.payload
          });
        },

      },
};
export default AppListModel;
