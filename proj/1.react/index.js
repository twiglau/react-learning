
class Transaction {
    constructor(wrappers) {
        this.wrappers = wrappers; // { initialize, close}
    }
    preform(anyMethod) {
        this.wrappers.forEach(wrapper=>wrapper.initialize());
        anyMethod.call();
        this.wrappers.forEach(wrapper=>wrapper.close());
    }
}
//batchingStrategy isBatchingUpdates batchUpdates
let batchingStrategy = {
    isBatchingUpdates: false, // 默认是非批量更新模式
    dirtyComponents: [], // 脏组件, 就组件的状态和界面上显示的不一样
    batchedUpdates(){
        this.dirtyComponents.forEach(component=>component.updateComponent())
    }
}
class Updater {
    constructor(component){
        this.component = component;
        this.pendingStates = [];
    }
    addState(particalState){
        this.pendingStates.push(particalState);
        batchingStrategy.isBatchingUpdates
        ?batchingStrategy.dirtyComponents.push(this.component) 
        :this.component.updateComponent()
    }
}
class Component {
    constructor(props){
        this.props = props
        this.$updater = new Updater(this);
    }
    updateComponent(){
        this.$updater.pendingStates.forEach(particalState=>Object.assign(this.state,particalState));
        this.$updater.pendingStates.length = 0;
        let oldEle = this.domElement;
        let newEle = this.getDOMElementFromRender();
        oldEle.parentElement.replaceChild(newEle,oldEle);

    }
    createDOMFromDOMString(domString){
        let div = document.createElement('div');
        div.innerHTML = domString;
        return div.children[0];
    }
    setState(particalState){
        this.$updater.addState(particalState)
    }
    getDOMElementFromRender(){
        let htmlString = this.render();
        this.domElement = this.createDOMFromDOMString(htmlString);
        // 让这个Button DOM 节点的 compoent属性等于当前 Counter 组件的实例
        this.domElement.component = this;
        // this.domElement.addEventListener('click',this.add.bind(this));
        return this.domElement;
    }
    mount(container){
        container.appendChild(this.getDOMElementFromRender());
    }

}
let transaction = new Transaction([
    {

        initialize() {
            console.log('initialize1');
            batchingStrategy.isBatchingUpdates = true; // 开始批量更新模式
        },
        close() {
            console.log('close1');
            batchingStrategy.isBatchingUpdates = false;
            batchingStrategy.batchedUpdates(); // 进行批量更新,把所有的脏组件根据自己的状态和属性 重新渲染
        }
    }
])
// React 把事件抛给全局,通过事件区分,对应到具体的方法
window.trigger = function(event,method){
    let component = event.target.component; // event.target = this.domElement
    transaction.preform(component[method].bind(component));
}
class Counter extends Component {
    constructor(props){
        super(props)
        this.state = { number: 0}
    }
    add(){
        this.setState({ number:this.state.number + 1})
        console.log(this.state) // 0
        this.setState({ number:this.state.number + 1})
        console.log(this.state) // 0
        setTimeout(()=>{
          this.setState({ number:this.state.number + 1})
          console.log(this.state) // 2
          this.setState({ number:this.state.number + 1})
          console.log(this.state) // 3
        },1000)
    }
    render() {
        return `<button onclick="trigger(event,'add')">
        ${this.props.name} : ${this.state.number}
        </button>`
    }
}