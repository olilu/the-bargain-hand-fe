import { Link, Form, redirect, useLoaderData } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

import WishlistForm from '../../components/forms/WishlistForm';


function EditWishlist() {
    const wishlist =  useLoaderData();
    return (
        <Modal show={true} contentClassName='bg-dark text-light'>
            <Modal.Header>
                <Modal.Title>Add New Wishlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WishlistForm email={wishlist.email} name={wishlist.name} country_code={wishlist.country_code} language_code={wishlist.language_code} />
            </Modal.Body>
        </Modal>
    );
}

export default EditWishlist;

export async function loader({params}) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${params.uuid}`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const wishlist = await response.json();
    return wishlist;
}

export async function action({params, request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/update/${params.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return redirect('/'); // redirect to the parent route
  }