import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { MdList } from "react-icons/md";
import DeleteConfirmation from '../layout/DeleteConfirmation';

function WishlistCard({uuid, name, language, country}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState(null);
    const navigate = useNavigate();
    function editHandler() {
        navigate(`${uuid}/edit-wishlist`)
    }

    function showDeleteModal(){
        setConfirmMessage(`Are you sure you want to delete wishlist: "${name}"?`);
        setShowConfirmModal(true);
    }

    function hideConfirmModal() {
        setShowConfirmModal(false);
    }

    function deleteWishlist(uuid) {
        fetch(`/api/wishlist/delete/${uuid}`, {
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
    }

    return (
        <> 
            <div className="card my-3 mx-2 text-center text-white bg-dark" style={{width: '12rem'}}>
                <Link to={`${uuid}/games`} className="link-light text-decoration-none">
                    <div className="card-body">
                            <MdList size={30}/>
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text fst-italic">{country}_{language}</p>
                    </div>
                </Link>
                <div className="card-footer d-flex justify-content-between">
                    <Button variant='outline-danger' className='btn-sm' onClick={showDeleteModal}>Delete</Button>
                    <Button variant='outline-success' className='btn-sm' onClick={editHandler}>Edit</Button>
                </div>
            </div>
            <DeleteConfirmation showModal={showConfirmModal} hideModal={hideConfirmModal} message={confirmMessage} confirmModal={deleteWishlist} uuid={uuid} />
        </>
    )
}

export default WishlistCard;