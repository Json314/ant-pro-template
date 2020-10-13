/*
 * 媒体列表页
 */
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message, Pagination, Card, Switch, Tooltip } from 'antd';
import { LoadingOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { connect, history } from 'umi';
import { useState, useEffect } from 'react';
import View from '../components/View';
import SearchForm from '../components/SearchForm';

const AppList = ({ dataList, total, dispatch, match, ...props }) => {
    const [page, setPage] = useState(1);                  // 页码
    const [pageSize, setPageSize] = useState(20);         // 每页展示的条数
    const [visible, setVisible] = useState(false);        // 抽屉状态
    const [viewData, setViewData] = useState(null);       // 抽屉详情数据
    const drawerOnClose = () => {                         // 抽屉关闭回调
        setVisible(false);
        setViewData(null);
    }
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
        { title: '名称', dataIndex: 'name', key: 'name', align: 'center', width: '15%',
            render: (a, b) => (
                <span className="primary" style={{ cursor: 'pointer' }}
                    onClick={ e => {
                        setVisible(true);
                        setViewData(b);
                    } }
                >{b.name}</span>
            )
        },
        { title: '系统类型', dataIndex: 'sysTypeText', key: 'sysTypeText', align: 'center' },
        { title: '业务类型', dataIndex: 'businessTypeText', key: 'businessTypeText', align: 'center' },
        { title: '包名', dataIndex: 'pkgName', key: 'pkgName', align: 'center', width: '10%', className: 'break-word', render: (a, b) => (b.pkgName || '- -') },
        { title: 'APPKey', dataIndex: 'appKey', key: 'appKey', align: 'center', width: '10%', className: 'break-word', render: (a, b) => (b.appKey || '- -') },
        { title: '状态', dataIndex: 'runningStatus', key: 'runningStatus', align: 'center',valueEnum: { 0: '正常', 1: '暂停' },
          render: (a, b) => {
              const [loading, setLoading] = useState(false);        // loading
              return (
                  <Switch className="status success" loading={ loading }
                      onChange={ async (checked, event) => {
                          setLoading(true);                         // loading状态
                          await handleStatusChange(checked, b);     // 提交修改
                          setLoading(false);
                          b.runningStatus = Number(!checked);       // 设置状态
                          b.runningStatusText = checked ? '正常' : '暂停';
                      } }
                      checkedChildren="开启" unCheckedChildren="暂停" defaultChecked={ !b.runningStatus } style={{ transform: 'scale(0.9)' }}
                  />
              )
          },
        },
        { title: '操作', dataIndex: 'option', key: 'option', align: 'center', width: '170px',
            render: (a, b) => {
                const [deleting, setDeleting] = useState(false);          // 删除的loading状态
                return (
                    <span className="operate-btns">
                        <a key="d" style={{ display: 'flex', width: '24px', justifyContent: 'center' }}>
                            {
                                props.copyData.id === b.id ?
                                (<Tooltip title="已复制" color="#52c41a" ><CheckCircleTwoTone style={{ fontSize : '15px' }} twoToneColor="#52c41a" /></Tooltip >) :
                                (<span onClick={ () =>  handleCopy(b) }>复制</span>)
                            }
                        </a>
                        <a key="a" onClick={ () => props.history.push('/app_form/' + b.id) }>修改</a>
                        <a key="b" onClick={ () => props.history.push('/slot/' + b.id) }>广告位</a>
                        <Popconfirm
                            placement="left"
                            title="确定删除吗？"
                            onConfirm={async () => {
                                setDeleting(true);                        // 删除的loading状态
                                await handleDelete(b);
                                setDeleting(false);
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a key="c" disabled={ deleting } className="danger">{ deleting ? (<LoadingOutlined />) : '删除' }</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const [formData, setFormData] = useState({ runningStatus: 0, businessType: 0 });

    // 搜索回调
    const handleSubmit = (params) => {
        setFormData(params);
        setPage(1);                               // 搜索时，设置页码为 1，防止没有数据报错
        requestData(params, 1, pageSize);
    }

    // 请求列表数据
    const requestData = async (formData, page, pageSize) => {
        let result = await dispatch({
            type: 'appList/getList',
            payload: {
                runningStatus: formData.runningStatus || 0,
                businessType: formData.businessType || 0,
                page,
                pageSize,
                searchValue: ''
            },
        });
        if (!result) return message.error('请求失败~');
        if (!result.length) return message.warning('暂无数据~');
    };

    // 删除
    const handleDelete = async (params) => {
        let result = await dispatch({
            type: 'appList/delete',
            payload: { id: params.id }
        });
        if(result) {
            message.success('删除成功~');
            let pages = dataList.length === 1 ? (page === 1 ? 1 : page - 1) : page;
            if (dataList.length === 1 && page !== 1) setPage((page) => (page - 1));       // 如果当页最后一条数据删除完，加载前一页数据
            requestData(formData, pages, pageSize);         // 删除完，重载数据
        }else {
            message.error('删除失败~');
        }
    }

    // 开启 或 暂停
    const handleStatusChange = async (checked, item) => {
        let type = !checked ? 'appList/paused' : 'appList/resume';        // 0 开启，1 暂停
        let result = await dispatch({
            type,
            payload: {
                id: item.id
            }
        });
        if(result){
            message.success('修改成功~');
            // requestData(formData, page, pageSize);       // 重载数据
        }else {
            message.error('修改失败~');
        }
    }

    // 复制数据
    const handleCopy = async (item) => {
        // 保存到 modal中，新建页可以获取
        await dispatch({
            type: 'appList/copy',
            payload: item
        });
    }

    useEffect(() => {
        requestData(formData, page, pageSize);              // 请求列表数据
    }, []);

    return (
        <PageContainer>
            <SearchForm
                handleSubmit={ handleSubmit }
                searching={ props.loading }
            />
            <ProTable
                columns={ columns }
                dataSource={ dataList }
                pagination={ false }
                rowKey="id"
                search={ false }
                loading={ props.loading }
                headerTitle="媒体管理"
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        onClick={() => {
                            history.push({ pathname: '/app_form/:id' });
                        }}
                    >
                        新建媒体
                    </Button>,
                ]}
            />
            <Card style={ {textAlign: 'right', marginTop: '-2px'} }>
                <Pagination
                    current={ page }
                    pageSize={ pageSize }
                    onChange={(pages, pageSizes) => {
                        // console.log(pages, pageSizes);
                        if(pages !== page) setPage(pages);                  // 设置页码
                        if(pageSizes !== pageSize) setPageSize(pageSizes);  // 设置条数
                        requestData(formData, pages, pageSizes);                      // 请求列表数据
                    }}
                    showSizeChanger={ true }
                    showTotal={ (total, range) => (total ? `第 ${ range[0] }-${ range[1] } 条/总计${ total }条 ` : '')}
                    total={ total }
                />
            </Card>
            <View
                title={ '媒体详情' }
                width={ 320 }
                visible={ visible }
                onClose={ drawerOnClose }
                viewData={ viewData }
            />
        </PageContainer>
    );
};

export default connect(({ appList, loading }) => ({
    dataList: appList.dataList,
    total: appList.total,
    copyData: appList.copyData,                          // 复制的数据
    loading: loading.effects['appList/getList'],
}))(AppList);
