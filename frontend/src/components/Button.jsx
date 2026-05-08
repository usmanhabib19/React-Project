const Button = (props) => {
    console.log('props', props);
    const { type = 'dark', variant, text = 'button' } = props
    return (
        <button className={`btn btn-${variant ? variant + "-" : ""}${type}`}>{text}</button>
    )

}

export default Button
