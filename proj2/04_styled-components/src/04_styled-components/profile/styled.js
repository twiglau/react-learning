import styled from 'styled-components'


/**
 * 特点:
 *  1. props穿透
 *  2. attrs的使用
 *  3. 传入state作为props属性
 */
export const HYInput = styled.input.attrs({
    placeholder:'请输入内容',
    borderColor: 'red'
}).withConfig({
    shouldForwardProp: prop => 'borderColor' !== prop
})`
   background-color: lightblue;
   border-color: ${props => props.borderColor};
   color:${props => props.color}
`