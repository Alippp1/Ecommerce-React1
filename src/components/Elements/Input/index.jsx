import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";

// eslint-disable-next-line react/display-name
const InputForm = forwardRef((props, ref) =>{
    // eslint-disable-next-line react/prop-types
    const { label, type, name, placeholder} = props;
    return(
         <div className="mb-6">
            <Label htmlFor={name}>{label}</Label>
            <Input type={type} name={name} placeholder={placeholder} ref={ref}/>
         </div>
    )
});

export default InputForm;