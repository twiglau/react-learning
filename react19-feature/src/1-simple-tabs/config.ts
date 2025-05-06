export const tabs = [
  { name: 'My Account', href: '#', current: true },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
]

export type Tab = typeof tabs[0]

/**
 * 这里需要注意的是， 案例中我们对 tabs 数据和 current 当前选中的一个管理方式。
 * 在使用过程中，我们可以尽量减少对于 state 的使用。 但是许多人在开发过程中非常依赖于
 * state, 管理不善时，可能会导致数据的大量冗余 re-render 产生。
 * 
 * 这里当我们切换点击时， 会修改两个数据，但是最终只有一个 state 变化。
 */