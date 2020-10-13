import { Badge } from 'antd';
import Drawers from '@/pages/components/Drawer';
import styles from '@/styles/View.less';
import { memo } from 'react';

const View = ({ viewData, ...props }) => {
    return viewData && (
        <Drawers { ...props }>
            <div className={ styles['view-box'] }>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>名称：</div>
                    <div className={ styles['content'] }>{ viewData.name }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>状态：</div>
                    <div className={ styles['content'] }>
                        <Badge status="processing" color={ viewData.runningStatus ? 'red': 'green' } />
                        { viewData.runningStatusText }
                    </div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>包名：</div>
                    <div className={ styles['content'] }>{ viewData.pkgName || '- -' }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>系统类型：</div>
                    <div className={ styles['content'] }>{ viewData.sysTypeText }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>业务线：</div>
                    <div className={ styles['content'] }>{ viewData.businessTypeText }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>appKey：</div>
                    <div className={ styles['content'] }>{ viewData.appKey || '- -' }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>备注：</div>
                    <div className={ styles['content'] }>{ viewData.note || '- -' }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>创建时间：</div>
                    <div className={ styles['content'] }>{ viewData.createdAt }</div>
                </div>
                <div className={ styles['view-item'] }>
                    <div className={ styles['title'] }>修改时间：</div>
                    <div className={ styles['content'] }>{ viewData.updatedAt }</div>
                </div>
            </div>
        </Drawers>
    );
}

export default memo(View);
