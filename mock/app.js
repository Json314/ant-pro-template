export default {
  // 媒体列表
  'POST /api/app/list': {
      code: 0,
      msg: 'success',
      data: {
          pager: {
              currentPage: 1,
              pageCount: 5,
              pageSize: 20,
              itemCount: 100
          },
          data: [
              { id: 1, name: 'qapp-小说阅读吧-鑫谷', appId: 1, sysType: 2, sysTypeText: 'Android', pkgName: 'pkg_name1', businessType: '业务线1', businessTypeText: '业务线描述1', appKey: 'appKey1', runningStatus: 0, runningStatusText: '正常', note: '备注1', createdAt: '2020-09-10 10:25:30', updatedAt: '2020-09-10 10:25:30' },
              { id: 2, name: 'qapp-热门小说大全', appId: 1, sysType: 3, sysTypeText: '快应用', pkgName: 'pkg_name2', businessType: '业务线2', businessTypeText: '业务线描述2', appKey: 'appKey2', runningStatus: 1, runningStatusText: '暂停', note: '备注2', createdAt: '2020-09-10 10:25:30', updatedAt: '2020-09-10 10:25:30' },
              { id: 3, name: '聚合SDK-快看小说', appId: 1, sysType: 5, sysTypeText: 'ios', pkgName: 'pkg_name3', businessType: '业务线3', businessTypeText: '业务线描述3', appKey: 'appKey3', runningStatus: 0, runningStatusText: '正常', note: '备注3', createdAt: '2020-09-10 10:25:30', updatedAt: '2020-09-10 10:25:30' },
              { id: 4, name: '聚合SDK-小说阅读吧', appId: 1, sysType: 2, sysTypeText: 'Android', pkgName: 'pkg_name4', businessType: '业务线4', businessTypeText: '业务线描述4', appKey: 'appKey4', runningStatus: 1, runningStatusText: '暂停', note: '备注4', createdAt: '2020-09-10 10:25:30', updatedAt: '2020-09-10 10:25:30' },
              { id: 5, name: '聚合SDK-西瓜小说', appId: 1, sysType: 3, sysTypeText: '快应用', pkgName: 'pkg_name5', businessType: '业务线5', businessTypeText: '业务线描述5', appKey: 'appKey5', runningStatus: 0, runningStatusText: '正常', note: '备注5', createdAt: '2020-09-10 10:25:30', updatedAt: '2020-09-10 10:25:30' },
              { id: 6, name: 'qapp-点众阅读', appId: 1, sysType: 5, sysTypeText: 'ios', pkgName: 'pkg_name6', businessType: '业务线6', businessTypeText: '业务线描述6', appKey: 'appKey6', runningStatus: 1, runningStatusText: '暂停', note: '备注6', createdAt: '2020-09-10 10:25:30', updatedAt: '2020-09-10 10:25:30' },
          ]
      }
  },

  // 删除媒体
  'GET /api/app/delete/:id': {
      code: 0,
      msg: 'success',
      data: true
  },

  // 暂停媒体
  'GET /api/app/paused/:id': {
      code: 0,
      msg: 'success',
      data: true
  },

  // 开启媒体
  'GET /api/app/resume/:id': {
      code: 0,
      msg: 'success',
      data: true
  },

  // 媒体详情
  'GET /api/app/view/:id': {
      code: 0,
      msg: 'success',
      data: { id: 2, name: '媒体2', appId: 1, sysType: 2, sysTypeText: '安卓', pkgName: 'pkg_name1', businessType: '业务线2', businessTypeText: '业务线描述2', appKey: 'appKey2', runningStatus: 1, runningStatusText: '暂停', note: '备注2', createAt: '2020-09-10 10:25:30', updateAt: '2020-09-10 10:25:30' }
  },

  // 新建媒体
  'POST /api/app/add': {
      code: 0,
      msg: 'success',
      data: 1
  },

  // 编辑媒体
  'POST /api/app/edit': {
      code: 0,
      msg: 'success',
      data: true
  }
}
