import React, { PureComponent } from "react"

import { StoreContext } from './context'
/**
 * 将组件和redux所依赖内容，连在一起
 */
export function connect(mapStateToProps, mapDispatchToProps) {
    // 高阶函数
    return function enhanceHOC(WrappedComponent) {
        class EnhanceComponent extends PureComponent {
            constructor(props, context) {
                super(props);
                this.state = {
                    // 构造函数里面，不能使用 this.context
                    storeState: mapStateToProps(context.getState())
                }
            }
            componentDidMount() {
                this.unsubscribe = this.context.subscribe(() => {
                    this.setState({
                        storeState: mapStateToProps(this.context.getState())
                    })
                })
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                return <WrappedComponent 
                        {...this.props}
                        {...mapStateToProps(this.context.getState())}
                        {...mapDispatchToProps(this.context.dispatch)}
                       />
            }
        }

        EnhanceComponent.contextType = StoreContext;
        return EnhanceComponent;
    }
}