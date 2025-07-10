

export interface Message {
  value: string,
  id: string,
  sending?:boolean
}

export function reducer(state: Message[], newMessage: Message) {
  const newItem = {
    ...newMessage,
    sending: true
  }

  return [...state, newItem]
}