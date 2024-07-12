import { React, useState } from 'react'
import axios from 'axios';
export const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [petName, setSecurity] = useState('');
    const afterSubmit = async (e) => {
        e.preventDefault();
        // console.log(email);here we have set up new values and we hav to reset passowrd
        try {
          
            const response = await axios.post('https://e-commerse-backend-yeft.onrender.com/api/v1/auth/forgot', {email, password,newPass,petName});

            if(response){
                console.log("endpointrs hitted correctly");
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <h1 class="header">Reset Password</h1>
            <form onSubmit={afterSubmit} className='formCont'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Old PasswordPassword</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">New Password</label>
                    <input onChange={(e) => { setNewPass(e.target.value) }} value={newPass} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Security question:what is yourpet name?</label>
                    <input onChange={(e) => { setSecurity(e.target.value) }} value={petName} className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Save changes</button>
                {/* <button type="button" onClick={navigate("/forgot-pass")} className="btn btn-primary mx-3">Reset Password</button> */}
            </form>

        </>


    )
}
