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