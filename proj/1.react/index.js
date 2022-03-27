class Component {
    constructor(props){
        this.props = props
    }
    createDOMFromDOMString(domString){
        let div = document.createElement('div');
        div.innerHTML = domString;
        return div.children[0];
    }
    setState(particalState){
       this.state = Object.assign(this.state,particalState)
        let oldEle = this.domElement;
        let newEle = this.getDOMElementFromRender();
        oldEle.parentElement.replaceChild(newEle,oldEle);
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
// React 把事件抛给全局,通过事件区分,对应到具体的方法
window.trigger = function(event,method){
    let component = event.target.component;
    component[method].call(component);
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