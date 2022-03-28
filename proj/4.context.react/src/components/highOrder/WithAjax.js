import React from "react";

export default function(Component){
   return class extends React.Component {
        constructor(){
            super()
            this.state = {value: ''}
        }
        componentDidMount() {
            fetch('http://localhost:3000/translation.json')
            .then(res=>res.json())
            .then(result=>{
                this.setState({value:result[this.props.val]});
            })

        }
        render() {
            return <Component {...this.props} value={this.state.value}/>
        }
   }
}