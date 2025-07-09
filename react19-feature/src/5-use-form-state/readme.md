# useActionState

1. 与 useState 的使用基本上是一致的。需要结合 form action 使用。它的更新机制依赖于 action
2. 接收两个参数： 一个回调函数，用于获取 action 传递过来的值。 第二个参数表示定义状态的初始值。
3. 回调函数，也接收两个参数： 第一个参数表示 当前状态值。 第二参数表示： 表单 action 提交传递过来的 FormData 值。
