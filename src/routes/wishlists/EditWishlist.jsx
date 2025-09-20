import { useLocation, redirect, useLoaderData } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

import WishlistForm from '../../components/forms/WishlistForm';
import { validateWishlistForm } from './utils';


function EditWishlist() {
    const wishlist = useLoaderData();
    const location = useLocation();
    return (
        <Modal 
            show={true} 
            contentClassName='bg-dark text-light'
            size="lg"
            style={{
                '--bs-modal-border-radius': 'var(--card-border-radius)'
            }}
        >
            <Modal.Header style={{
                background: 'var(--bg-gradient-primary)',
                color: 'white',
                borderBottom: 'none',
                borderRadius: 'var(--card-border-radius) var(--card-border-radius) 0 0'
            }}>
                <Modal.Title style={{
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '1.25rem'
                }}>
                    Edit Wishlist
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                padding: 'var(--spacing-lg)',
                backgroundColor: '#343a40'
            }}>
                <WishlistForm
                    actionURL={location.pathname}
                    email={wishlist.email}
                    name={wishlist.name}
                    country_code={wishlist.country_code}
                    language_code={wishlist.language_code}
                    isModal={true} />
            </Modal.Body>
        </Modal>
    );
}

export default EditWishlist;

export async function loader({ params }) {
    const response = await fetch(`/api/wishlist/${params.uuid}`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const wishlist = await response.json();
    return wishlist;
}

export async function action({ params, request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);

    const [isValid, validatedPostData, errorMessage] = validateWishlistForm(postData);

    if (!isValid) {
        return {
            error: errorMessage,
        };
    }
    await fetch(`/api/wishlist/update/${params.uuid}`, {
        method: 'PUT',
        body: JSON.stringify(validatedPostData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return redirect('/'); // redirect to the parent route
}