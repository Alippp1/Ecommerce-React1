import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

// eslint-disable-next-line no-unused-vars
const FormRegister = (props) =>{
    return(
        <form action="">
          <InputForm label="Fullname" type="text" name="fullname" placeholder="Input your fullname"/>
          <InputForm label="Email" type="email" name="email" placeholder="Input your email"/>
          <InputForm label="Password" type="password" name="password" placeholder="******"/>
            <InputForm label="Confirm Password" type="password" name="ConfirmPassword" placeholder="Confirm Password"/>
          
          <Button classname="bg-blue-600 w-full">Register</Button>
        </form>
    )
}

export default FormRegister;