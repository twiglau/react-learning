# 文件夹结构  
* 按 feature 组织源文件  
* 组件和样式文件同一级  
* Redux 单独文件夹  
* 单元测试保持同样目录结构放在 tests 文件夹  

# 组件和样式  
```
index.js  style.less
   |          |

Comp1.js|Comp1.less  Comp2.js|Comp2.less ...
```  

# 组织 Action 和 Reducer  
```
actions    reducers


action|reducer  action|reducer ...
```  

# constants.js  常量  
```
export const EXAMPLES_COUNTER_PLUS_ONE = 'EXAMPLES_COUNTER_PLUS_ONE';
export const EXAMPLES_COUNTER_MINUS_ONE = 'EXAMPLES_COUNTER_MINUS_ONE';
```  