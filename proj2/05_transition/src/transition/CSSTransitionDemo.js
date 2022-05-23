import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group';

import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
export default class CSSTransitionDemo extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            isShow: true
        }
    }
    render() {
        const { isShow } = this.state
        return (
            <div>
                <Button onClick={e => this.setState({isShow: !isShow})} type='primary'>显示/隐藏</Button>

                <CSSTransition in={isShow}
                               classNames='card'
                               timeout={300}
                               unmountOnExit={true}
                               appear
                               onEnter={el => console.log('进入状态',el)}
                               onEntering={el => console.log('正在进入',el)}
                               onEntered={el => console.log('进入完成',el)}
                               onExit={el => console.log('退出状态',el)}
                               onExiting={el => console.log('正在退出',el)}
                               onExited={el => console.log('退出完成',el)}
                               >
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </CSSTransition>
            </div>
        )
    }
}
