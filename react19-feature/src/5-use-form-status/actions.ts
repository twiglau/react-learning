

export async function formAction(fd:FormData) {
  const title = fd.get('title')
  const content = fd.get('content')

  if(!title || !content) {
    return alert('Miss Info')
  }

  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(`Title: ${title}, Content: ${content}`)
}