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
                <WishlistForm/>
            </Modal.Body>
        </Modal>
    );
}

export default NewWishlist;

export async function action({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    console.log(JSON.stringify(postData));
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/create`, {
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