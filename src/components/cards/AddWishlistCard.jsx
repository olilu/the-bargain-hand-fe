import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { MdPlaylistAdd } from "react-icons/md";

function AddWishlistCard() {
    const addWishlistString = 'Add Wishlist'
    return (
        <div className="enhanced-card text-center text-white bg-secondary" 
             style={{ 
                height: 'var(--card-height-wishlist)',
                background: 'var(--bg-gradient-secondary) !important',
                border: '2px dashed rgba(255, 255, 255, 0.3)'
             }}>
            <Link to="/add-wishlist" className="link-light text-decoration-none">
                <div className="card-body d-flex flex-column align-items-center justify-content-center" 
                     style={{ height: 'calc(var(--card-height-wishlist) - 60px)', padding: 'var(--spacing-md)' }}>
                    <div className="mb-3" style={{ 
                        background: 'rgba(255, 255, 255, 0.2)', 
                        borderRadius: '50%', 
                        width: '60px', 
                        height: '60px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: 'var(--card-shadow-medium)',
                        backdropFilter: 'var(--backdrop-blur)'
                    }}>
                        <MdPlaylistAdd size={32} color="white" />
                    </div>
                    <h5 className="card-title" style={{ 
                        fontSize: '1rem', 
                        fontWeight: 'var(--font-weight-semibold)', 
                        margin: '0',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>{addWishlistString}</h5>
                </div>
            </Link>
            <div className="card-footer d-flex justify-content-center" style={{ 
                borderTop: 'none', 
                background: 'transparent', 
                padding: 'var(--spacing-sm) var(--spacing-md)',
                height: '60px',
                alignItems: 'center'
            }}>
                <Link to="/add-wishlist" className="link-light text-decoration-none w-100">
                    <Button className='enhanced-btn enhanced-btn-primary btn-sm w-100'>{addWishlistString}</Button>
                </Link>
            </div>
        </div>
    )
}

export default AddWishlistCard;