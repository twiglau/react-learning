import React from 'react'

export default function Detail3(props) {
  console.log(props.location)
  const { state, query, search } = props.location
  return (
    <div>
      <h2>Detail3 </h2>
      state
      {
        Object.keys(state).map(ele => <li>{ele}: {state[ele]}</li>)
      }
      query
      {
        Object.keys(query).map(ele => <li>{ele}: {query[ele]}</li>)
      }
    </div>
  )
}
