import { useLocation, redirect, useLoaderData } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

import WishlistForm from '../../components/forms/WishlistForm';


function EditWishlist() {
    const wishlist =  useLoaderData();
    const location = useLocation();
    return (
        <Modal show={true} contentClassName='bg-dark text-light'>
            <Modal.Header>
                <Modal.Title>Edit Wishlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WishlistForm 
                    actionURL={location.pathname} 
                    email={wishlist.email} 
                    name={wishlist.name} 
                    country_code={wishlist.country_code} 
                    language_code={wishlist.language_code} />
            </Modal.Body>
        </Modal>
    );
}

export default EditWishlist;

export async function loader({params}) {
    const response = await fetch(`/api/wishlist/${params.uuid}`);
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

    const locale = `${postData.language_code}-${postData.country_code}`;
    const isLocaleValid = Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0;
    
    if (!isLocaleValid) {
        return {error: `Country and language combination is not valid: ${locale}. It needs to be a valid locale.`};
    }

    await fetch(`/api/wishlist/update/${params.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return redirect('/'); // redirect to the parent route
  }