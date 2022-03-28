import React from "react";



export default function(Comp){
   return class extends React.Component {
        componentWillMount(){
            console.time('cost');
        }
        componentDidMount(){
            console.timeEnd('cost');
        }
        render() {
            return <Comp {...this.props}/>
        }
   }
}