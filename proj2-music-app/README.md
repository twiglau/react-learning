# 使用 TODO 查看所有注释

# redux-thunk 使用

1. 组件中某段代码 发送网络请求

```js
userEffect;
```

2. store dispatch 某个 action, action 拆分：

1) thunk 后，
2) 发送某个 对应 dispatch

# redux hook 的使用

- 组件和 redux 关联： 获取数据和进行操作

1. 操作： 直接在组件中获取 dispatch

```js
const dispatch = useDispatch();
// 发送网络请求
useEffect(() => {
  dispatch(某个action);
}, [dispatch]);
```

2. 获取： useSelector

```js
const { topBanners } = useSelector((state) => ({
  topBanners: state.recommend.topBanners,
}));
```
