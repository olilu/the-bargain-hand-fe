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
            <div className="enhanced-card text-center text-white bg-dark" 
                 style={{ height: 'var(--card-height-wishlist)' }}>
                <Link to={`${uuid}/games`} className="link-light text-decoration-none">
                    <div className="card-body d-flex flex-column align-items-center justify-content-center" 
                         style={{ height: 'calc(var(--card-height-wishlist) - 60px)', padding: 'var(--spacing-md)' }}>
                        <div className="mb-2" style={{ 
                            background: 'var(--bg-gradient-primary)', 
                            borderRadius: '50%', 
                            width: '50px', 
                            height: '50px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: 'var(--card-shadow-medium)'
                        }}>
                            <MdList size={24} color="white"/>
                        </div>
                        <h5 className="card-title" style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'var(--font-weight-semibold)', 
                            marginBottom: 'var(--spacing-xs)',
                            lineHeight: '1.2'
                        }}>{name}</h5>
                        <p className="card-text fst-italic" style={{ 
                            fontSize: '0.75rem', 
                            opacity: '0.8',
                            margin: '0'
                        }}>{country}_{language}</p>
                    </div>
                </Link>
                <div className="card-footer d-flex gap-2" style={{ 
                    borderTop: 'none', 
                    background: 'transparent', 
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    height: '60px',
                    alignItems: 'center'
                }}>
                    <Button className='enhanced-btn enhanced-btn-danger btn-sm flex-fill' onClick={showDeleteModal}>Delete</Button>
                    <Button className='enhanced-btn enhanced-btn-primary btn-sm flex-fill' onClick={editHandler}>Edit</Button>
                </div>
            </div>
            <DeleteConfirmation showModal={showConfirmModal} hideModal={hideConfirmModal} message={confirmMessage} confirmModal={deleteWishlist} uuid={uuid} />
        </>
    )
}

export default WishlistCard;