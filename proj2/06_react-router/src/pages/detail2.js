import React from 'react'

export default function Detail2(props) {
  console.log(props.location)
  return (
    <div>Detail2 {props.location.search}</div>
  )
}
