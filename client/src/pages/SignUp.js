import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../utils/mutations";
import "./SignUp.css";
import { Link } from 'react-router-dom';

const SignUp = ({ setUser }) =>{
    
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
      });
      const history = useHistory();
      const [addUser, { error, data }] = useMutation(ADD_USER);

    
      // update state based on form input changes
      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
        ...formState,
        [name]: value,
    });
    };

    // submit form
    const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        const { data } = await addUser({
        variables: { ...formState },
    });
    console.log(data);
    Auth.login(data.token, history);
    setUser(data.addUser.user)
    } catch (e) {
        console.error(e);
    }
    };

    return(
        <main className="base-grid home-columns">
            <nav className="full-width nav-columns distribute-even fit">
                <Link to="/profile">
                <button className="btn">Profile</button>
                </Link>
                <Link to="/find-service">
                <button className="btn">Find Service</button>
                </Link>
                <Link to="/offer-service">
                <button className="btn">Offer Service</button>
                </Link>
                <button className="btn">Language</button>
                <button onClick={Auth.logout}className="btn">Logout</button>
            </nav>
            <section className="sign full-width">
                <form className=" signup fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="sig">Sign up</h4>
                    <div className="empw">
                        <label>Name</label>
                        <input 
                            type="text"
                            placeholder="name"
                            name="first_name"
                            onChange={handleInputChange}
                            value={formState.first_name}
                            // required
                        />
                        <label>Last Name</label>
                        <input 
                            type="text"
                            placeholder="last name"
                            name="last_name"
                            onChange={handleInputChange}
                            value={formState.last_name}
                            // required
                        />
                        <label>Username</label>
                        <input 
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleInputChange}
                            value={formState.username}
                            // required
                        />
                        <label>Email</label>
                        <input 
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={handleInputChange}
                            value={formState.email}
                            // required
                        />
                        <label> Password</label>
                        <input 
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={handleInputChange}
                            value={formState.password}
                            // required
                        />
                        {/* <label>Confirm Password</label>
                        <input 
                        placeholder="confirm password"
                        name="confirm_password"
                        onChange={handleInputChange}
                        value={formState.confirm_password}
                        required
                        /> */}
                    </div>
                    <button 
                        className="btnlog"
                        disabled = {!(formState.first_name && formState.last_name && formState.username && formState.email && formState.password)}
                        type = "submit"
                        onClick={handleFormSubmit}
                        variant = "success">
                        Sign Up
                    </button>
                </form>
            </section>
        </main>
    );
}
export default SignUp;