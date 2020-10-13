/*
 * 媒体表单  ---  新建 和 修改
 */
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Input, Select, Radio, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { connect, history } from 'umi';

const AppForm = ({ dispatch, match, ...props }) => {
    const id = Number(match.params.id);           // 编辑页传递的id
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({    // 表单数据
        name: '',
        sysType: '',
        businessType: '',
        appKey: '',
        note: ''
    });
    // 错误提示信息
    const validateMessages = {
        required: '${label} 是必选字段!',
    }

    // 请求详情数据
    const getConfigDetial = async () => {
        const result = await dispatch({
            type: 'appForm/view',
            payload: { id, }
        });
        if(result) {
            form.setFieldsValue(result);          // set 表单数据
        }else {
            message.error('获取详情数据失败~');
        }
    };

    // 提交 --- 新建 或 修改
    const handleSubmit = async (params) => {
        // console.log(params);
        let result, type = '添加';
        if (id) {
            result = await dispatch({
                type: 'appForm/edit',
                payload: {
                    id,
                    name: params.name
                }
            });
            type = '修改';
        }else {
            result = await dispatch({
                type: 'appForm/add',
                payload: params
            });
        }
        if(result) {
            message.success(type + '成功~');
            let timer = setTimeout(() => {
                clearTimeout(timer);
                history.goBack();                    // 返回上一页
            }, 300);
            timer = null;
        }else {
            message.error(type + '失败~');
        }
    };

    // 编辑页  --- 请求详情数据
    useEffect(() => {
        if (id) {
            getConfigDetial();
        } else {
            let { id, ...data } = props.copyData;    // 复制的数据
            form.setFieldsValue(data);               // 把copy的数据赋值给表单
        }
    }, []);

    return (
        <PageContainer>
            <Form
                form={ form }
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 8 }}
                onFinish={ handleSubmit }
                validateMessages={ validateMessages }
                autoComplete="off"
                style={{ marginBottom: '-24px' }}
            >
                <Card>
                    <Form.Item name="name" label="名称" rules={[{ required: true }]} hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item name="pkgName" label="包名" rules={[{ required: true }]} hasFeedback>
                        <Input disabled={ !!id } />
                    </Form.Item>
                    <Form.Item name="sysType" label="系统类型" rules={[{ required: true }]} hasFeedback>
                        <Radio.Group disabled={ !!id }>
                            <Radio value={2}>Android</Radio>
                            <Radio value={3}>快应用</Radio>
                            <Radio value={5}>ios</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="businessType" label="业务类型" rules={[{ required: true }]} hasFeedback>
                        <Select showSearch optionFilterProp="children" listItemHeight={ 32 } disabled={ !!id }>
                            <Select.Option value={1}>新媒体</Select.Option>
                            <Select.Option value={2}>快应用</Select.Option>
                            <Select.Option value={3}>客户端</Select.Option>
                        </Select>
                    </Form.Item>
                </Card>

                <Card style={{ 'marginTop': '20px' }}>
                    <Form.Item wrapperCol={{ span: 6, offset: 18 }} style={{ 'textAlign': 'right', 'marginBottom': 0 }}>
                        <Button
                            loading={ id ? props.editting : props.submitting }
                            type="primary"
                            data-type="edit"
                            htmlType="submit"
                            style={{ marginRight: '15px' }}
                        >
                            { id ? '修改' : '创建' }
                        </Button>
                        <Button
                            type="defalut"
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </PageContainer>
    );
}

export default connect(({appForm, appList, loading}) => ({
    copyData: appList.copyData,           // 复制的数据
    submitting: loading.effects['appForm/add'],
    editting: loading.effects['appForm/edit'],
}))(AppForm);
