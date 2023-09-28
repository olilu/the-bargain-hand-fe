import { Link, Form, redirect } from 'react-router-dom';
import Modal from '../../components/layout/Modal';
import 'bootstrap/dist/css/bootstrap.css';


function NewWishlist() {
    return (
        <Modal>
            <div className="mb-3">
                <h5 className="modal-title">Add New Wishlist</h5>
            </div>
                <Form method='post'>
                    <div className="mb-3">
                        <label htmlFor="name">Wishlist Name</label>
                        <input className='form-control' type="text" id="name" name='name' placeholder='MyWishlist'  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">E-Mail</label>
                        <input className='form-control' type='email' name='email' id="email" placeholder='email@example.com' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country_code">Country Code</label>
                        <input className='form-control' type="text" name='country_code' id="country_code" defaultValue='CH'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="language_code">Language Code</label>
                        <input className='form-control' type="text" name='language_code' id="language_code" defaultValue='de' />
                    </div>
                    <p className="mb-3">
                        <Link className="btn btn-secondary  me-3" type="button" to="..">Cancel</Link>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </p>
                </Form>
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