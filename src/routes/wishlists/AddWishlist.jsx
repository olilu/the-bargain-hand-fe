import { redirect } from 'react-router-dom';
import  {Modal}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import WishlistForm from '../../components/forms/WishlistForm';


function NewWishlist() {
    return (
        <Modal show={true} contentClassName='bg-dark text-light'>
            <Modal.Header>
                <Modal.Title>Add New Wishlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WishlistForm actionUrl="/add-wishlist"/>
            </Modal.Body>
        </Modal>
    );
}

export default NewWishlist;

export async function action({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);

    const locale = `${postData.language_code}-${postData.country_code}`;
    const isLocaleValid = Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0;

    if(postData.country_code.toUpperCase() === 'UK') {
        postData.country_code = 'GB';
    }
    
    if (!isLocaleValid) {
        return {error: `Country and language combination is not valid: ${locale}. It needs to be a valid locale.`};

    }
    
    await fetch('/api/wishlist/create', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(error => {
        console.error(error);
    });
    
    return redirect('/'); // redirect to the parent route
  }