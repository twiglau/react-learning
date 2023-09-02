import React, { PureComponent } from "react"
import store from '../2-store'
/**
 * 将组件和redux所依赖内容，连在一起
 */
export function connect(mapStateToProps, mapDispatchToProps) {
    // 高阶函数
    return function enhanceHOC(WrappedComponent) {
        return class extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    storeState: mapStateToProps(store.getState())
                }
            }
            componentDidMount() {
                this.unsubscribe = store.subscribe(() => {
                    this.setState({
                        storeState: mapStateToProps(store.getState())
                    })
                })
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                return <WrappedComponent 
                        {...this.props}
                        {...mapStateToProps(store.getState())}
                        {...mapDispatchToProps(store.dispatch)}
                       />
            }
        }
    }
}