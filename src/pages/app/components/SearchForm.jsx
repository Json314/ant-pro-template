import { Card, Form, Select, Button, Row, Col } from 'antd';
const { Option } = Select;
import { memo } from 'react';

const SearchForm = (props) => {
    const [form] = Form.useForm();
    return (
        <Card style={{ marginBottom: '15px' }}>
            <Form
                onFinish={ props.handleSubmit }
                form={ form }
                style={{ marginBottom: '-24px' }}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item name="businessType" label="业务类型">
                            <Select>
                                <Option value={1}>新媒体</Option>
                                <Option value={2}>快应用</Option>
                                <Option value={3}>客户端</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name="runningStatus" label="状态">
                            <Select>
                                <Option value={1}>正常</Option>
                                <Option value={2}>暂停</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Button
                            loading={ props.searching }
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: '15px' }}
                        >
                            搜索
                        </Button>
                        <Button
                            style={{ marginRight: '15px' }}
                            onClick={() => {
                                form.setFieldsValue({
                                    businessType: '',
                                    runningStatus: '',
                                });
                            }}
                        >
                            清空
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}

export default SearchForm;
