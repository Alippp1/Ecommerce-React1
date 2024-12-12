const Button = (props) =>{
    // eslint-disable-next-line react/prop-types
    const { children, classname = "bg-black", onClick = () => {}, type="button" } = props;
    return(
        <button 
        className={`h-10 px-6 font-semibold rounded-md ${classname} text-white`}
        type={type}
        onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button;