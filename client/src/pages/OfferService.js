import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "./OfferService.css";
import { useQuery } from '@apollo/client';
import {ADD_SERVICEPOST, REMOVE_SERVICE_POST} from '../utils/mutations';
import { QUERY_SERVICES, QUERY_ME } from '../utils/queries'



const OfferService = () =>{
    const { loading, data:userData } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
    });
    const user= loading?null:userData.me;
    console.log(user)
    
    console.log(user);
    const history = useHistory();
    const [formState, setFormState] = useState({ 
        name: '', 
        description: '', 
        type: '',
        email: '', 
        location: '', 
        hourly_rate: '', 
        phone_number: '', 
        image: '',
    });

    const [addServicePost, { error, data }] = useMutation(ADD_SERVICEPOST);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState, [name]: value
    });
    console.log(formState)
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addServicePost({ 
                variables: {
                    // ...formState,
                    name : formState.name,
                    description: formState.description,
                    location: formState.location,
                    type: formState.type,
                    hourly_rate: formState.hourly_rate,
                    phone_number: formState.phone_number,
                    image: 'image',
                    user: Auth.getUser()
                },
            });
            history.go(0);
        } 
        catch (err) {
            
            console.error(err);
        }
    };
    const [removeServicePost, { error:err, data:rmvdata }] = useMutation(REMOVE_SERVICE_POST);
    const handleDelete = async (_id) => {
        console.log(_id)
        const { data } = await removeServicePost ({
            
            variables: {
                _id,
                user: Auth.getUser()
            }
        })
        history.go(0);
    }
    console.log(formState);
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
        <div className="full-width">
                <h3 className="center">Offer a service</h3>
            </div>
        <section className="login">
            <form onSubmit={handleFormSubmit} className=" signin fit stack" style={{margin:"auto", maxWidth:"65%"}}>
                <h4 className="log">Add a new service</h4>
                <div className="empw">
                    <label>Service Name</label>
                    <input 
                        placeholder="service name"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={formState.name}
                        // required 
                    />
                    <label>Location</label>
                    <input 
                        placeholder="location"
                        type="text"
                        name="location"
                        onChange={handleInputChange}
                        value={formState.location}
                        // required 
                    />
                    
                    <label>Hourly Rate</label>
                    <input 
                        placeholder="hourly rate"
                        type="text"
                        name="hourly_rate"
                        onChange={handleInputChange}
                        value={formState.hourly_rate}
                        // required 
                    />
                    <label>Phone Number</label>
                    <input 
                        placeholder="phone number"
                        type="text"
                        name="phone_number"
                        onChange={handleInputChange}
                        value={formState.phone_number}
                        // required 
                    />
                    <label>Email</label>
                    <input 
                        placeholder="email"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={formState.email}
                        // required 
                    />
                    <label>Service Description</label>
                    <input 
                        placeholder="service desciption"
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={formState.description}
                        // required 
                    />
                    {/* <label>Service Image</label>
                    <input 
                        placeholder="add a image of your service"
                        type="text"
                        name="image"
                        onChange={handleInputChange}
                        value={formState.image}
                        // required 
                    /> */}
                    <label> Type of service</label>
                    <select 
                        // className="select"
                        // placeholder="type of service"
                        name="type"
                        onChange={handleInputChange}
                        value={formState.type}
                    >
                        <option>Adult Care</option>
                        <option>Art</option>
                        <option>Beauty</option>
                        <option>ChildCare</option>
                        <option>Event Planning</option>
                        <option>Graphic Design</option>
                        <option>Handy man</option>
                        <option>House Cleaning</option>
                        <option>Make up</option>
                        <option>Personal Assistent</option>
                        <option>Personal Training</option>
                        <option>Pet Walking</option>
                        <option>Photography</option>
                        <option>Translations</option>
                        <option>Tutoring</option>
                        <option>Web Design</option>                    
                    </select>
                </div>                
                <div className="full-width distribute-even fit">
                    {/* <button
                        className="add fit"
                        disabled = {!(formState.image)}
                        type = "submit"
                        onClick={handleFormSubmit}
                        variant = "success">
                        Add photo
                    </button> */}
                    <button 
                        className="save fit"
                        disabled = {!(formState.name && formState.type && formState.location && formState.hourly_rate && formState.phone_number && formState.email && formState.description)}
                        type = "submit"
                        onClick={handleFormSubmit}
                        variant = "success">
                        Save Changes
                    </button>
                    <button className="cancel fit">Cancel</button>
                </div>
            </form>
        </section>
        <section className="intro">
            {
                user?.servicePost.map((post) => ( 
                    <div className="" key={post._id}>
                        <div className="find">
                            <img/>
                            <div>
                                <h6>Service name: {post.name}</h6>
                                <p>Type:{post.type}</p>
                                <p>Location:{post.location}</p>
                                <p>Hourly rate:{post.hourly_rate}</p>
                            </div>
                            <button className="btn-delete" onClick={()=>handleDelete(post._id)}>Delete</button>
                        </div>
                    </div>        
                ))
            }
        
        </section>
    </main>
    );
}
export default OfferService;