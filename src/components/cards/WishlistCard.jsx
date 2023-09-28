import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { MdList } from "react-icons/md";

function WishlistCard({uuid, name, email, language, country}) {
    return (
        <div className="card my-3 mx-2 text-center text-white bg-dark" style={{width: '10rem'}}>
            <Link to={`${uuid}/games`} className="link-light text-decoration-none">
                <div className="card-body">
                        <MdList size={30}/>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text fst-italic">{country}_{language}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <Button variant='outline-danger' className='btn-sm'>Delete</Button>
                    <Button variant='outline-success' className='btn-sm'>Edit</Button>
                </div>
            </Link>
        </div>
    )
};

export default WishlistCard;