import React from "react";
import PropTypes from 'prop-types';

export default class Person extends React.Component {
    static defaultProps = {
        isMarried: false
    }
    
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['male','female']),
        isMarried: PropTypes.bool,
        hobby: PropTypes.arrayOf(PropTypes.string),
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        age(props, propName, componentName){
            if(props[propName]<18){
                return new Error(`Invalid Prop ${propName}, supplied to ${componentName}`)
            }
        }
    }

    render() {
        return (
          <div>
              {this.props.name}
          </div>
        )
    }
}