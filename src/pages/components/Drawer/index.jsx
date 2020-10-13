import { Drawer } from 'antd';

const Drawers = (props) => {
    return (
        <Drawer
            title={ props.title || '' }
            placement="right"
            width={ props.width || 256 }
            visible={ props.visible }
            closable={ true }
            onClose={ props.onClose || null }
        >
            { props.children }
        </Drawer>
    );
}

export default Drawers;
