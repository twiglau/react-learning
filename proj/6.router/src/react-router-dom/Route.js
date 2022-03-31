import React from 'react';
import RouterContext from './context';
import pathToRegexp from 'path-to-regexp';
export default class Route extends React.Component {
    static contextType = RouterContext;
    render(){
        const {pathname} = this.context.location;
        const {path='/',component:Component,exact=false} = this.props;
        let paramNames = [];
        const regexp = pathToRegexp(path,paramNames,{end:exact});
        let result = pathname.match(regexp);
        let props = {
            location: this.context.location,
            history: this.context.history
        }
        if(result){
            paramNames = paramNames.map(item=>item.name);
            const [url,...values] = result
            console.log({url,values})
            let params = {};
            for(let i=0;i<paramNames.length;i++){
                params[paramNames[i]] = values[i]
            }
            props.match = {
                path,
                url,
                isExact: url === pathname,
                params,
            }
            return <Component {...props} />
        }
        return null;
    }
}