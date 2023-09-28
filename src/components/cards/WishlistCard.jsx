import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { MdList } from "react-icons/md";

function WishlistCard({uuid, name, language, country}) {
    const navigate = useNavigate();
    function editHandler() {
        navigate(`/edit-wishlist`)
    };

    function deleteHandler() {
        deleteWishlist();
    };

    function deleteWishlist() {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/delete/${uuid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete wishlist');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            navigate(`/`)
        })
        .catch(error => {
            console.error(error);
        });
    };
    
    return (
        <div className="card my-3 mx-2 text-center text-white bg-dark" style={{width: '10rem'}}>
            <Link to={`${uuid}/games`} className="link-light text-decoration-none">
                <div className="card-body">
                        <MdList size={30}/>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text fst-italic">{country}_{language}</p>
                </div>
            </Link>
            <div className="card-footer d-flex justify-content-between">
                <Button variant='outline-danger' className='btn-sm' onClick={deleteHandler}>Delete</Button>
                <Button variant='outline-success' className='btn-sm' onClick={editHandler}>Edit</Button>
            </div>
        </div>
    )
};

export default WishlistCard;