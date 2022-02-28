# connect  
* Component - Connect -> Store  
```
import { connect } from 'react-redux';
class SidePanel extends Component {
    // ...
}

function mapStateToProps(state) {
    return {
        nextgen: state.nextgen,
        router: state.router
    };
}
function mapDispatchProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
```   

* connect 的工作原理: 高阶组件  