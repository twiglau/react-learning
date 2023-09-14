import React from 'react'

export default function Detail(props) {
  const match = props.match
  return (
    <div>Detail: {match.params.id}</div>
  )
}
