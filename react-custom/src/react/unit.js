import $ from 'jquery';
import { Element,createElement } from './element';
import types from './types';
let diffQueue = []; // 差异队列
let updateDepth = 0; // 更新的级别
class Unit { // 通过父类保存参数
    constructor(element){
        this._currentElement = element
    }
}
class ReactTextUnit extends Unit {
    getMarkUp(rootId){ // 保存当前元素的 id
        this._rootId = rootId
        // 并且返回当前元素对应的 html 脚本
        return `<span data-reactid="${rootId}">${this._currentElement}</span>`
    }
    update(nextElement){
        if(this._currentElement !== nextElement){
            this._currentElement = nextElement;
            $(`[data-reactid="${this._rootId}"]`).html(this._currentElement);
        }
    }
}
class ReactNativeUnit extends Unit {
    getMarkUp(rootId){
        this._rootId = rootId;
        // 拼接 渲染的内容
        let {type, props } = this._currentElement; // div name data-reactid
        let tagStart = `<${type} data-reactid="${rootId}"`
        let tagEnd = `</${type}>`;
        let contentStr = '';
        this._renderedChildrenUnits = [];
        for(let propName in props){
            if(/on[A-Z]/.test(propName)){
                let eventType = propName.slice(2).toLowerCase(); // click
                // react 里面的事件 都是通过事件委托的方式来绑定
                $(document).delegate(`[data-reactid="${rootId}"]`,`${eventType}.${this._rootId}`,props[propName]);
                // $(document).on(eventType, `[data-reactid="${rootId}"]`, props[propName]);
            }else if(propName === 'style'){
                let styleObj = props[propName];
                let styles = Object.entries(styleObj).map(([attr, value])=>{
                    attr = attr.replace(/[A-Z]/g,matched => { return `-${matched.toLowerCase()}`});
                    return `${attr}:${value}`;
                }).join(';');
                tagStart += ( `style="${styles}" `);
            }else if(propName === 'className'){ // 如果是 一个类名的话
                tagStart += ( ` class="${props[propName]}" `);
            }else if(propName === 'children'){ 
                let children = props[propName];
                children.forEach((child, index) =>{
                    let childUnit = createReactUnit(child);
                    childUnit._mountIndex = index;
                    this._renderedChildrenUnits.push(childUnit);
                    let childMarkUp = childUnit.getMarkUp(`${this._rootId}.${index}`);
                    contentStr += childMarkUp;

                });
            }else{
                tagStart += (` ${propName}=${props[propName]}`)
            }
        }
        // 返回拼接后字符串
        return tagStart + '>' + contentStr + tagEnd;
    }
    update(nextElement){
        let oldProps = this._currentElement.props;
        let newProps = nextElement.props;
        this.updateDOMProperties(oldProps, newProps);
        this.updateDOMChildren(nextElement.props.children);
    }
    // 此处要把新的儿子们传过来, 然后与老的儿子们进行对比, 然后找出差异, 进行修改DOM
    updateDOMChildren(newChildrenElements){
        updateDepth++;
        this.diff(diffQueue, newChildrenElements);
        updateDepth--;
        if(updateDepth === 0){
            this.patch(diffQueue);
            diffQueue = [];
        }
    }
    patch(diffQueue){
        let deleteChildren = []; // 这里要放所有将要删除的节点
        let deleteMap = {}; // 这里存在能复用的节点
        for(let i=0;i<diffQueue.length;i++){
            let difference = diffQueue[i];
            if(difference.type === types.MOVE || difference.type === types.REMOVE){
                let fromIndex = difference.fromIndex;
                let oldChild = $(difference.parentNode.children().get(fromIndex));
                if(!deleteMap[difference.parentId]){
                    deleteMap[difference.parentId] = {}
                }
                deleteMap[difference.parentId][fromIndex] = oldChild;
                deleteChildren.push(oldChild);
            }
        }
        $.each(deleteChildren,(idx, item)=>$(item).remove());

        for(let i=0;i<diffQueue.length;i++){
            let difference = diffQueue[i];
            switch(difference.type){
                case types.INSERT:
                    this.insertChildAt(difference.parentNode, difference.toIndex, $(difference.markUp));
                break;
                case types.MOVE:
                    this.insertChildAt(difference.parentNode, difference.toIndex, deleteMap[difference.parentId][difference.fromIndex]);
                break;
                default:
                break;
            }
        }
    }
    insertChildAt(parentNode, index, newNode){
        let oldChild = parentNode.children().get(index);
        oldChild?newNode.insertBefore(oldChild):newNode.appendTo(parentNode);
    }
    diff(diffQueue, newChildrenElements){
        // 第一步生成一个 map, key = 老的unit
        let oldChildrenUnitMap = this.getOldChildrenMap(this._renderedChildrenUnits);
        // 第二步生成一个新的儿子unit的数组
        let { newChildrenUnitMap, newChildrenUnits } = this.getNewChildren(oldChildrenUnitMap, newChildrenElements);
        let lastIndex = 0; // 上一个已经确定位置的索引
        for(let i=0; i<newChildrenUnits.length;i++){
            let newUnit = newChildrenUnits[i];
            //第一个拿到就是 newKey = A
            let newKey = (newUnit._currentElement.props&&newUnit._currentElement.props.key)||i.toString();
            let oldChildUnit = oldChildrenUnitMap[newKey];
            if(oldChildUnit === newUnit){// 如果说新老一致的话, 说明复用了老节点
                
                if(oldChildUnit._mountIndex < lastIndex){
                    diffQueue.push({
                        parentId: this._rootId,
                        parentNode:$(`[data-reactid="${this._rootId}"]`),
                        type: types.MOVE,
                        fromIndex: oldChildUnit._mountIndex,
                        toIndex:i
                    })
                }
                lastIndex = Math.max(lastIndex, oldChildUnit._mountIndex);
            }else{
                if(oldChildUnit){
                    // key 相同, 类型不同, 需要把老的节点删除掉
                    diffQueue.push({
                        parentId: this._rootId,
                        parentNode:$(`[data-reactid="${this._rootId}"]`),
                        type: types.REMOVE,
                        fromIndex:oldChildUnit._mountIndex
                    });
                    this._renderedChildrenUnits = this._renderedChildrenUnits.filter(item=>item!=oldChildUnit);
                    $(document).undelegate(`.${oldChildUnit._rootId}`)
                }
                diffQueue.push({
                    parentId: this._rootId,
                    parentNode:$(`[data-reactid="${this._rootId}"]`),
                    type: types.INSERT,
                    toIndex:i,
                    markUp: newUnit.getMarkUp(`${this._rootId}.${i}`)
                })
            }
            newUnit._mountIndex = i;
        }

        for(let oldKey in oldChildrenUnitMap){
            let oldChild = oldChildrenUnitMap[oldKey];
            if(!newChildrenUnitMap.hasOwnProperty(oldKey)){
                diffQueue.push({
                    parentId: this._rootId,
                    parentNode:$(`[data-reactid="${this._rootId}"]`),
                    type: types.REMOVE,
                    fromIndex: oldChild._mountIndex
                });
                // 如果要删除掉某一个节点, 则要把它对应的unit也排除掉
                this._renderedChildrenUnits = this._renderedChildrenUnits.filter(item=>item!=oldChild);
                $(document).undelegate(`.${oldChild._rootId}`);
            }
        }

    }
    getNewChildren(oldChildrenUnitMap, newChildrenElements){
        let newChildrenUnits = [];
        let newChildrenUnitMap = {};
        newChildrenElements.forEach((newElement, index)=>{
            // 一定要给key, 千万不要走内部索引的key
            let newKey = (newElement.props && newElement.props.key) || index.toString();
            let oldUnit = oldChildrenUnitMap[newKey]; // 找到老的 unit
            let oldElement = oldUnit&&oldUnit._currentElement; // 获取老元素
            if(shouldDeepCompare(oldElement,newElement)){
                oldUnit.update(newElement);
                newChildrenUnits.push(oldUnit);
                newChildrenUnitMap[newKey] = oldUnit;
            }else{
                let nextUnit = createReactUnit(newElement);
                newChildrenUnits.push(nextUnit);
                newChildrenUnitMap[newKey] = nextUnit;
                this._renderedChildrenUnits[index] = nextUnit;
            }
        });
        return {newChildrenUnitMap,newChildrenUnits};
    }
    getOldChildrenMap(childrenUnits=[]){
        let map = {};
        for(let i=0;i<childrenUnits.length;i++){
            let unit = childrenUnits[i];
            let key = (unit._currentElement.props && unit._currentElement.props.key) || i.toString();
            map[key] = unit;
        }
        return map;
    }

    updateDOMProperties(oldProps, newProps){
        let propName;
        for(propName in oldProps){// 循环老的属性集合
            if(!newProps.hasOwnProperty(propName)){
                $(`[data-reactid=${this._rootId}]`).removeAttr(propName);
            }
            if(/on[A-Z]/.test(propName)){
                $(document).undelegate(`.${this._rootId}`);
            }
        }
        for(propName in newProps){
            if(propName == 'children'){// 如果是儿子属性的话, 我们先不处理
                continue;
            }else if(/on[A-Z]/.test(propName)){
                let eventType = propName.slice(2).toLowerCase(); // click
                $(document).delegate(`[data-reactid="${this._rootId}"]`,`${eventType}.${this._rootId}`,newProps[propName]);
            }else if(propName === 'className'){// 如果是一个类名的话
                $(`[data-reactid="${this._rootId}"]`).attr('class', newProps[propName]);
            }else if(propName == 'style'){
                let styleObj = newProps[propName];
                Object.entries(styleObj).map(([attr, value])=>{
                    $(`[data-reactid="${this._rootId}"]`).css(attr, value);
                });
            }else{
                $(`[data-reactid="${this._rootId}"]`).prop(propName, newProps[propName]);
            }
        }
    }
}
// 负责渲染 react 组件
class ReactCompositeUnit extends Unit {
    //这里负责处理组件的更新操作
    update(nextElement, partialState){
        // 先获取到新的元素
        this._currentElement = nextElement || this._currentElement;
        // 获取新的状态, 不管要不要更新组件, 组件的状态一定要修改
        let nextState = this._componentInstance.state = Object.assign(this._componentInstance.state, partialState);
        // 新的属性对象
        let nextProps = this._currentElement.props;
        if(this._componentInstance.shouldComponentUpdate &&
           !this._componentInstance.shouldComponentUpdate(nextProps, nextState)){
           return;
        }
        // 下面要进行比较更新 先得到上次渲染的单元
        let preRenderedUnitInstance = this._renderedUnitInstance;
        // 得到上次渲染的元素
        let preRenderedElement = preRenderedUnitInstance._currentElement;
        let nextRenderElement = this._componentInstance.render();
        // 如果新旧两个元素类型一样, 则可以进行深度比较, 
        // 如果不一样, 直接删掉老的元素, 新建新的元素
        if(shouldDeepCompare(preRenderedElement, nextRenderElement)){
            // 如果可以进行深比较, 则把更新的工作交给上次渲染出来的那个 element 元素对应的 unit 来处理
            preRenderedUnitInstance.update(nextRenderElement);
            this._componentInstance.componentDidUpdate && this._componentInstance.componentDidUpdate();
        }else{
            this._renderedUnitInstance = createReactUnit(nextRenderElement);
            let nextMarkup = this._renderedUnitInstance.getMarkUp();
            $(`[data-reactid="${this._rootId}"]`).replaceWith(nextMarkup);
        }
    }
    getMarkUp(rootId){
        this._rootId = rootId
        let {type: Component, props} = this._currentElement;
        let componentInstance = this._componentInstance = new Component(props);
        // 让组件的实例的 currentUnit 属性等于当前的 unit 
        this._componentInstance._currentUnit = this;
        componentInstance.componentWillMount && componentInstance.componentWillMount()
        // 调用 render 后返回的结果
        let reactComponentRenderer = componentInstance.render(); // 0
        // 递归渲染 组件 render 后的返回结果
        let reactCompositeUnitInstance = this._renderedUnitInstance = createReactUnit(reactComponentRenderer);
        let markup = reactCompositeUnitInstance.getMarkUp(rootId);
        // 在递归后绑定的事件, 儿子先绑定成功后, 父亲再触发
        // 先序深度优先
        $(document).on('mounted', ()=>{
            componentInstance.componentDidMount && componentInstance.componentDidMount()
        })
        return markup;
    }
}
function shouldDeepCompare(oldElement, newElement){
    if(oldElement != null && newElement != null){
        let oldType = typeof oldElement;
        let newType = typeof newElement;
        
        if(
            (oldType === 'string' || oldType == 'number') &&
            (newType === 'string' || newType == 'number')
        ){
            return true;
        }
        if(oldElement instanceof Element && newElement instanceof Element){
            
            return oldElement.type == newElement.type;
        }
    }
    return false;
}
function createReactUnit(element){
    if(typeof element == 'string' || typeof element === 'number'){
        return new ReactTextUnit(element)
    }
    if(typeof element === 'object' && typeof element.type === 'string'){
        return new ReactNativeUnit(element);
    }
    if(typeof element === 'object' && typeof element.type === 'function'){
        return new ReactCompositeUnit(element); // {type:Counter, {name: 'xxx'}}
    }
}
export default createReactUnit;