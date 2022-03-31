const pathToRegexp = require('path-to-regexp');
// 路径转正则的库

let regexp = pathToRegexp('/home',[],{end:false})
console.log(regexp);
/**
 * () 表示捕获分组, ()会把每个分组里的匹配的值保存起来, 使用 $n(n是一个数字,表示第n个捕获组的内容)
 * (?:) 表示非捕获分组, 和捕获分组唯一的区别在于,非捕获分组配置的值不会保存起来
 */

/**
 * 前瞻     exp1(?=exp2)                 查找exp2前面的exp1
 * 后顾     (?<=exp2)exp1                查找exp2后面的exp1
 * 负前瞻   exp1(?!exp2)                  查找后面不是exp2的exp1
 * 负后顾    (?<!=exp2)exp1               查找前面不是exp2的exp1
 */

let url = '/home';
let result = url.match(regexp);
console.log(result);
