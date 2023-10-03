import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { MdPlaylistAdd } from "react-icons/md";

function AddWishlistCard() {
    return (
        <div className="card my-3 mx-2 text-center text-white bg-secondary" style={{ width: '12rem' }}>
            <Link to="/add-wishlist" className="link-light text-decoration-none">
                <div className="card-body">
                    <MdPlaylistAdd size={50} />
                    <h5 className="card-title">Add Wishlist</h5>
                </div>
            </Link>
            <div className="card-footer d-flex justify-content-center">
                <Link to="/add-wishlist" className="link-light text-decoration-none">
                    <Button variant='primary' className='btn-sm' style={{'box-shadow': '0 .125rem .25rem #000000'}}>Add Wishlsit</Button>
                </Link>
            </div>
        </div>
    )
};

export default AddWishlistCard;