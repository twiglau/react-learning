import $ from 'jquery';
import createReactUnit from './unit.js'
import createElement from './element'
import Component from './component'
const React = {
    render,
    nextRootIndex:0,
    createElement,
    Component
}
// 给每个元素 添加一个属性 , 为了方便获取到 这个元素
function render(element, container){
    // 写一个 工厂函数 来创建对应的 react 元素
    // 通过这个工厂函数来创建
    let createReactUnitInstance = createReactUnit(element);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex);
    $(container).html(markUp);
    $(document).trigger('mounted'); // 所有组件都ok了
}
export default React;