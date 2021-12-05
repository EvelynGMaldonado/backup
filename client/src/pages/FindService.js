import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "./FindService.css";
import { useQuery } from '@apollo/client';
import {QUERY_FINDSERVICE} from '../utils/queries';
import { QUERY_SERVICES} from '../utils/queries'
import { Redirect, useParams } from 'react-router-dom';

const FindServicePost = () =>{
    
    const [formState, setFormState] = useState({ 
        type: '',
        location: '', 
    });
    const [service, setService] = useState([])

    const { loading, data, error } = useQuery(QUERY_FINDSERVICE, {
        fetchPolicy: "no-cache",
        variables: {
            type: formState.type,
            location: formState.location,
        }
    });
    console.log('outsideUseEffect: ', loading, error)
    // useEffect(() => {
        
    // }, [data])
    // console.log('data: ', data)
    // console.log("service: ", service);
    // console.log(findServicePost);
    // const service= loading?null:data.findServicePost;
    // console.log(service)

    const history = useHistory();
    
    // const [findServicePost] = useQuery(QUERY_FINDSERVICE);
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
            console.log('gql data: ', loading, error)
            if (!loading && data && data.findServicePost) {
                console.log('useEffect: ', data.findServicePost);
                setService(data.findServicePost)
            }
        } catch(e) {
            console.log('useEffectError: ', e)
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
            <div className="full-width">
                <h3 className="center">Find a service</h3>
            </div>
            <form  className="fit options full-width">
                <select 
                type="text"
                className="select"
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
                <input 
                className="zipcode" 
                placeholder="zipcode"
                type="text"
                name="location"
                onChange={handleInputChange}
                value={formState.location}/>
                <button 
                    className="go"
                    disabled={!(formState.type && formState.location)}
                    type="submit"
                    onClick={handleFormSubmit}
                    variant="success">
                    go!
                </button>
            </form>
            <section className="edit full-width">
                {
                    // data && data.findServicePost ? ( data.findServicePost.map((post) => (
                    service.map((post) => (
                <div className="editprof fit stack" key={post.type} style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="ed">RESULTS</h4>
                    <div className="find">
                        <img/>
                        <div>
                            <h6>Service name: {post?.name}</h6>
                            <p>Description:{post?.description}</p>
                            <p>Location:{post?.location}</p>
                            <p>Hourly rate:{post?.hourly_rate}</p>
                        </div>
                        <Link className='btn-more' to={`/service-post/${post?.location}/${post?.type}`}>
                            More...
                        </Link>
                    </div>
                </div>
                    ))
                    // ) : null
    }
            </section>
        </main>
    );
}
export default FindServicePost;