import { createRandomMessage } from '@/utils'

const requestOptions: RequestInit = {
  method: 'GET',
  redirect: 'follow'
}

const url = 'https://api.thecatapi.com/v1/images/search?limit=1'

export const getMessage = async () => {
  await fetch(url, requestOptions)
  return { value: createRandomMessage()}
}