import React from "react"

const Flex = (props: { col:boolean,children: React.ReactNode, className:string }) => {
   return (
    <div >
      {props.children}
    </div>
   )
}

export default Flex