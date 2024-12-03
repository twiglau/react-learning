export function reducer(state, newMessage) {
  let newItem = {
    text: newMessage,
    sending: true,
  };

  return [...state, newItem];
}

export function reducer2(state, newState) {
  return newState;
}
