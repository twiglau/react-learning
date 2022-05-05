
export class Element {
    constructor(type, props){
        this.type = type;
        this.props = props;
    }
}

function createElement(type, props, ...children){
    props = props || {}
    props.children = children;
    return new Element(type, props)
}

// 返回虚拟dom 用对象来描述元素
export default createElement;

/*
<div name="xxx">say <span>你好</span> </div>
{
    type: 'div',
    props: {
        name: 'xxx',
        children: [
            'say',
            {
                type: 'span',
                props:{
                    children: ['你好']
                }
            }
        ]
    }
}
*/