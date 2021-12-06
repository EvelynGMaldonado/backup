import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_ME, QUERY_FIND_USER } from '../utils/queries';
import { Redirect, useParams } from 'react-router-dom';

import "./UserProfile.css";

const UserProfile =() => {
    
    const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
    });
    console.log("line 11", data);
    const user= loading?null:data.me
    console.log(user);
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
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="ed">Edit Profile</h4>
                    <div className="empw">
                        <img/>
                        <h6>Full Name: {`${user?.first_name} ${user?.last_name}`} </h6>
                        <p>Email: {user?.email}</p>
                        <p>Biography: {user?.aboutme}</p> 
                        <p>My Services:{user?.servicePost[0]?.name}</p>
                        <ul>
                            {user?.servicePost.map((post) => ( 
                            <li key={post._id}>
                                {post.name}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/edit-profile">
                    <button className="editprof-btn">Edit Profile</button>
                    </Link>
                </form>
            </section>
        </main>
    );
}
export default UserProfile;