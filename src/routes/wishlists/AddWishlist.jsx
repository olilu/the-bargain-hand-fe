import { redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import WishlistForm from '../../components/forms/WishlistForm';
import { validateWishlistForm } from './utils';


function NewWishlist() {
    return (
        <Modal show={true} contentClassName='bg-dark text-light'>
            <Modal.Header>
                <Modal.Title>Add New Wishlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WishlistForm actionUrl="/add-wishlist" />
            </Modal.Body>
        </Modal>
    );
}

export default NewWishlist;

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);

    const [isValid, validatedPostData, errorMessage] = validateWishlistForm(postData);

    if (!isValid) {
        return {
            error: errorMessage,
        };
    }

    await fetch('/api/wishlist/create', {
        method: 'POST',
        body: JSON.stringify(validatedPostData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(error => {
        console.error(error);
    });

    return redirect('/'); // redirect to the parent route
}