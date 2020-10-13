import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { Form, Input, InputNumber } from 'antd';
import styles from './index.less';
const EditableContext = createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// cbk 参数为回车提交表单的回调函数
const EditableCell = (cbk) => {
  return ({ title, editable, children, dataIndex, record, type, rules, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();                    // inputRef 用来点击获取焦点
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      // 更新input数据为列表中显示的数据
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    // 提交
    const save = async (e) => {
      try {
        const values = await form.validateFields();// 触发表单校验
        toggleEdit();                             // 切换edit状态
        cbk({ ...record, ...values });            // 保存的回调函数
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    }
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item name={ dataIndex } rules={ rules } className="editable-form-item" style={{ margin: 0 }}>
          {
            type === 'number' ? (<InputNumber ref={ inputRef } onPressEnter={ save } onBlur={ toggleEdit } style={{ width: '100%' }} />) : <Input ref={ inputRef } onPressEnter={ save } onBlur={ toggleEdit } style={{ width: '100%' }} />
          }
        </Form.Item>
      ) : (
        <div onClick={ toggleEdit } className={ styles['editable-cell-value-wrap'] }>{ children }</div>
      );
    }

    return <td { ...restProps }>{ childNode }</td>;
  }
}

export { EditableRow, EditableCell };
