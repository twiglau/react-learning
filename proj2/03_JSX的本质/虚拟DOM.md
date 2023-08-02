# 虚拟 DOM 的创建过程

- 我们通过 React.createElement 最终创建出来一个 ReactElement 对象;
- 这个 ReactElement 对象是什么作用呢? React 为什么要创建它呢?

  > 原因是 React 利用 ReactElement 对象组成了一个 JavaScript 的对象树
  > JavaScript 的对象就是大名鼎鼎的虚拟 DOM(Virtual DOM)

# 为什么使用虚拟 DOM

- 为什么要采用虚拟 DOM, 而不是直接修改真实的 DOM 呢?

  > 很难跟踪状态发生的改变: 原有的开发模式, 我们很难跟踪到状态发生的改变, 不方便针对我们应用程序进行调试
  > 操作真实 DOM 性能较低: 传统的开发模式会进行频繁的 DOM 操作, 而这一的做法性能非常的低

- DOM 操作性能非常低:
  > 首先, document.createElement 本身创建出来的就是一个非常复杂的对象
  > 其次, DOM 操作会引起浏览器的回流和重绘, 所以在开发中应该避免频繁的 DOM 操作

# 声明式编程

- 虚拟 DOM 帮助我们从命令式编程转到了声明式编程的模式
- React 官方的说法: Virtual DOM 是一种编程理念
  > 在这个理念中, UI 以理想化或者说虚拟化的方式保存在内存中, 并且它是一个相对简单的 JavaScript 对象
  > 我们可以通过 ReactDOM.render 让虚拟 DOM 和真实 DOM 同步起来, 这个过程中叫做 协调(Reconcilication)
- 这种编程的方式赋予了 React 声明式的 API:
  > 你只需要要告诉 React 希望让 UI 是什么状态;
  > React 来确保 DOM 和这些状态是匹配的;
  > 你不需要直接进行 DOM 操作, 就可以从手动更改 DOM,属性操作, 事件处理解放出来
