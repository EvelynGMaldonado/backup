import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Auth from '../utils/auth';
// import { useMutation } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {LOGIN_USER} from '../utils/mutations';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import "./Home.css";

// const LoginForm = () => {
//   const [userFormData, setUserFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     password: ""
//   });
//   const [validated] = useState(false);
//   // const [showAlert, setShowAlert] = useState(false);
//   const [loginUser] = useMutation(LOGIN_USER);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({
//       ...setUserFormData, [name]: value
//     });
//   };
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget; 
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.setPropahation();
//     }
//     try {
//       const { data } = await loginUser ({
//         variables: {
//           ...userFormData
//         },
//       });
//       Auth.login(data.login.token);
//     } catch(err) {
//       console.log(err);
//       // setShowAlert(true);
//     }
//     setUserFormData({
//       first_name: "",
//       last_name: "",
//       username: "",
//       email: "",
//       password: ""
//     });
//   };
  
// };
const Home = ({ setUser, updateLocal }) => {
  // const { loading, data } = useQuery(QUERY_ME, {
  //   fetchPolicy: "no-cache"
  // });
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const history = useHistory();
  // const [login] = useMutation(LOGIN_USER);
  // const User = data?.User || [];


  // const [userFormData, setUserFormData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   username: "",
  //   email: "",
  //   password: ""
  // });


  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  // const [loginUser] = useMutation(LOGIN_USER);

  const handleLanguageChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    updateLocal(value);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState, [name]: value
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // const form = event.currentTarget; 
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.setPropahation();
    // }
    try {
      const { data } = await login ({
        variables: {...formState},
      });
      console.log(data);
      Auth.login(data.login.token, history);
      setUser(data.login.user);
    } catch(err) {
      console.log(err);
      // setShowAlert(true);
    }
    // setUserFormData({
    //   first_name: "",
    //   last_name: "",
    //   username: "",
    //   email: "",
    //   password: ""
    // });

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  // };

  //update state besed on input changes
  // const handleChange = (event) =>{
  //   const {name, value} = event.target;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //     });
  // }


  // //submit form
  // const handleformSubmit = async (event) =>{
  //   event.preventDefault();
  //   console.log(formState);

  //   try{
  //     const {data} = await addUser({
  //       variables: {...formState},
  //     });
  //     Auth.login(data.addUser.token)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <main className="home base-grid home-columns" >
      <div className="mission full-width">
        <h5 className="miss">Mission statement</h5>
        <p>IGotcha app finds qualified individual in your area or across the world to bring you the services that you need.
          "We as humans, will always have a need to seek help from others, conversely, we also have skills to share and help those around us".
          </p>
        <div className="center">
        <img src={require("../assets/fb.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/instagram.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/pinterest.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/twitter.png").default} style={{width:"30px"}} alt="pp"/>
        </div>
      </div>
      <nav className="full-width nav-columns distribute-even fit">
        <Link to="/profile">
          <button className="btn"><FormattedMessage id="profile"/></button>
        </Link>
        <Link to="/find-service">
        <button className="btn">Find Service</button>
        </Link>
        <Link to="/offer-service">
        <button className="btn">Offer Service</button>
        </Link>
        <select 
                type="text"
                className="btn select"
                name="language"
                onChange={handleLanguageChange}
                >
                    <option>English</option>
                    <option>Spanish</option>
                </select>
        <button onClick={Auth.logout}className="btn">Logout</button>
      </nav>
      <div className="images full-width distribute-even fit">
        <img src={require("../assets/babysitter.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/caregiver.jpeg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/cleaning1.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/handyman.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/petsitter.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/photographer.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/remote.png").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/tutoring.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
      </div >
      <section className="login">
          <form onSubmit={handleFormSubmit} className=" signin fit stack" style={{margin:"auto", maxWidth:"65%"}}>
            <h4 className="log"><FormattedMessage id="login"/></h4>
            <div className="empw full-width">
              <label>Email</label>
              <input 
                style={{maxWidth:"100%"}}
                type="text" 
                placeholder="email"
                name ="email"
                onChange = {handleInputChange}
                value = {formState.email}
                // required 
              />
              <label> Password</label>
              <input 
                style={{maxWidth:"100%"}} 
                type= "password"
                placeholder="pasword"
                name= "password"
                onChange = {handleInputChange}
                value = {formState.password}
                // required
              />
            </div>
            <button 
              className="btnlog"
              disabled = {!(formState.email && formState.password)}
              type = "submit"
              onClick={handleFormSubmit}
              variant = "success">
              Login
            </button>
          </form>
          <Link to="/signup">
            <button className="btnsign full-width">Sign up</button>
          </Link>
      </section>
      <section className="intro">
        <div className="">
          <img className="screen" src={require("../assets/screens.jpg").default} style={{maxWidth:"50%"}}alt="pp"/>
          <div>
            <h4 className="works">How it works:</h4>
            <p>Search for whatever you need, explore the profile of your possible candidates, find your match, hire and repeat!</p>
            <p> Show and share your skills to others, have fun and repeat!</p>
          </div>
        <div className="full-width distribute-even fit">
        <button className="btnmore ">About us</button>
        <button className="btnmore">Contact us</button>
        <button className="btnmore">Language</button>
        </div>
        </div>
      </section>
    </main>

  );
};

export default Home;
