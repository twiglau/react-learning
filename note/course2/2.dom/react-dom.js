function render(element,parentNode){
    if(typeof element == 'string'||typeof element == 'number'){
       return  parentNode.appendChild(document.createTextNode(element));
    }
    let type,props;
    type = element.type;//Welcome1
    props = element.props;
    // 类组件
    if(type.isReactComponent){
        let returnedElement = new type(props).render();
        type = returnedElement.type;//"h1"
        props = returnedElement.props;//{id:'welcome'}
    // 函数组件
    }else if(typeof type == 'function'){
        let returnedElement = type(props);
        type = returnedElement.type;//"h1"
        props = returnedElement.props;//{id:'welcome'}
    }
    let domElement = document.createElement(type);//span
    for(let propName in props){
        if(propName == 'className'){
            domElement.className = props[propName];
        }else if(propName == 'style'){
            let styleObj = props[propName];// {color: 'red',fontSize: '50px'}
            //for(let attr in styleObj){
            //    domElement.style[attr] = styleObj[attr];
           // } fontSize=>font-size
            //['color','fontSize']=>['color:red','fontSize:50px']=>'color:red;fontSize:50px'
            let cssText = Object.keys(styleObj).map(attr=>{
                 return `${attr.replace(/([A-Z])/g,function(){return "-"+arguments[1].toLowerCase()})}:${styleObj[attr]}`;
             }).join(';');
            domElement.style.cssText = cssText;
        }else if(propName == 'children'){
            // 1. 函数组件时保持数组
            // let children = Array.isArray(props.children)?props.children:[props.children];
            // children.forEach(child=>render(child,domElement));
            // 2. 类组件
            props.children.forEach(child=>render(child,domElement));
        }else{
            domElement.setAttribute(propName,props[propName]);
        }
    }
    parentNode.appendChild(domElement);
    //componentDidMount
}
export default {render}