import request from '@/utils/request';

// 媒体列表
export async function appList(params) {
  return request('/api/app/list', {
    method: 'POST',
    data: params
  });
}

// 删除媒体
export async function appDelete(params) {
  return request('/api/app/delete/' + params.id);
}

// 开启媒体
export async function appResume(params) {
  return request('/api/app/resume/' + params.id);
}

// 暂停媒体
export async function appPaused(params) {
  return request('/api/app/paused/' + params.id);
}

// 媒体详情
export async function appView(params) {
  return request('/api/app/view/' + params.id);
}

// 新建媒体
export async function appAdd(params) {
  return request('/api/app/add', {
    method: 'POST',
    data: params
  });
}

// 编辑媒体
export async function appEdit(params) {
  return request('/api/app/edit', {
    method: 'POST',
    data: params
  });
}
