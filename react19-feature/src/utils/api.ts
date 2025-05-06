import { createRandomMessage, uuid } from '@/utils';

const requestOptions: RequestInit = {
  method: 'GET',
  redirect: 'follow'
}

const count = 3;

const url = `https://api.thecatapi.com/v1/images/search?limit=${count}&page=0`

export const getMessage = async () => {
  const response = await fetch(url, requestOptions)
  const data = await response.json()
  console.log('data', data)
  return { value: createRandomMessage(), id: uuid()}
}

// const url1 = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

export const getUserInfo = async () => {
  const response = await fetch(url)
  const data = await response.json()

  const users: UserInfo[] = data.map((item: UserInfo) => {
    item.desc = createRandomMessage()
    item.id = uuid()
    return item
  })

  return users
}

interface PromiseWithCancel<T> extends Promise<T> {
  cancel: () => unknown
}

export function getUsersInfo() {
  const len = Math.floor(Math.random()*10) % 10
  const url1 = `https://api.thecatapi.com/v1/images/search?limit=${len}&page=0`

  // 1. 内建对象 AbortController 可以终止异步任务。
  // 可以使用该对象实例来终止 fetch 请求。
  const controller = new AbortController()

  // 2. controller 具有单个属性 signal, 我们可以在这个属性上
  // 上设置事件监听。
  const signal = controller.signal
  signal.addEventListener('abort', () => {
    console.log('取消了请求')
  })

  // eslint-disable-next-line no-async-promise-executor
  const __promise = new Promise(async resolve => {
    try {

      // 4. fetch中封装了 signal 的事件监听
      // 因此它可以很好的与 AbortController 对象一起工作
      const response = await fetch(url1, {signal})
      const data = await response.json()

      const users: UserInfo[] = data.map((item: UserInfo) => {
        item.desc = createRandomMessage()
        return item
      })
      resolve(users)

    } catch {
      console.warn('fetch have been canceled!')
    }
  })

  const promise = __promise as PromiseWithCancel<UserInfo[]>
  promise.cancel = () => {
    // 3. controller 具有单个方法： abort(), 
    // 当abort()调用时， signal的事件监听就会执行。
    if(controller) {
      controller.abort()
    }
  }

  return promise
}