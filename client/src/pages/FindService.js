import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "./FindService.css";

const FindService = () =>{
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
            <form className="fit options full-width">
                <select className="select">
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
                <input className="zipcode" placeholder="zipcode"/>
                <button className="go">go!</button>
            </form>
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="ed">RESULTS</h4>
                    <div className="find">
                        <img/>
                        <form>
                            <h6>Service name:</h6>
                            <p>Provider's name:</p>
                            <p>Location:</p>
                            <p>Hourly rate:</p>
                        </form>
                        <button className="btn-more">More...</button>
                    </div>
                </form>
            </section>
        </main>
    );
}
export default FindService;