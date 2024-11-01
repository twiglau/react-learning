export default function Button(props) {
    const { children, ...other } = props
    return (
        <button className="reload-btn" {...other}>{children}</button>
    )
}