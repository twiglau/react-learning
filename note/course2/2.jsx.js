
// Babel 转义 React.createElement('h1',null,'hell0')
// <h1 id="mytitle" className='mytitle' style={styles}>hell0 {name0} {getName1()}</h1>
let element = React.createElement(
    "h1", 
    {className:'title'}, 
    "hello",
    React.createElement('span',{},'world')
    );
    // element.props ={ children:[],className="title"}
  console.log(element)
  /**
   * React 元素 就是一个普通的 JS 对象
   * 
  {
    "type": "h1",
    "props": {
      "className": "title",
      "children": ["hello", {
        "type": "span",
        "props": {
          "children": "world"
        },
      }]
    }
  }
   */