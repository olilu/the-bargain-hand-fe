import { Link, Form, redirect } from 'react-router-dom';
import Modal from '../../components/layout/Modal';
import 'bootstrap/dist/css/bootstrap.css';


function EditWishlist(uuid, name, email,language, country) {
    return (
        <Modal>
            <div className="mb-3">
                <h5 className="modal-title">Edit Wishlist</h5>
            </div>
                <Form method='post'>
                    <div className="mb-3">
                        <label htmlFor="name">Wishlist Name</label>
                        <input className='form-control' type="text" id="name" name='name' defaultValue={name}  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">E-Mail</label>
                        <input className='form-control' type="text" name='email' id="email" defaultValue={email} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country_code">Country Code</label>
                        <input className='form-control' type="text" name='country_code' id="country_code" defaultValue={country}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="language_code">Language Code</label>
                        <input className='form-control' type="text" name='language_code' id="language_code" defaultValue={language} />
                    </div>
                    <p className="mb-3">
                        <Link className="btn btn-secondary  me-3" type="button" to="..">Cancel</Link>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </p>
                </Form>
        </Modal>
    );
}

export default EditWishlist;

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