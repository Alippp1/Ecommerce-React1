import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

import { login } from "../../services/auth.service";

// eslint-disable-next-line no-unused-vars
const FormLogin = (props) =>{

  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (event) =>{
    event.preventDefault();
    // save login ke local storage
    // localStorage.setItem('email',event.target.email.value);
    // localStorage.setItem('password',event.target.password.value);
    // window.location.href ="/products";

    // login ke api
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    login(data,(status, res)=>{
      if(status){
        localStorage.setItem('token',res);
        window.location.href ="/products";
      }else{
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);
  
  useEffect(() => {
    usernameRef.current.focus();
  },[])

    return(
        <form onSubmit={handleLogin}>
          <label htmlFor="">Login dengan akun yang ada<a href="https://fakestoreapi.com/users"><b className="text-blue-600"> Disini</b></a></label>
          <InputForm label="Username" type="text" name="username" placeholder="Atau ketik johnd" ref={usernameRef}/>
          <InputForm label="Password" type="password" name="password" placeholder="dan m38rmF$"/>
          
          <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
          {loginFailed && <p className="text-red-600 text-center">{loginFailed}</p>}
        </form>
    )
}

export default FormLogin;