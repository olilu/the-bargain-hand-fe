import { Link, Form } from 'react-router-dom';

function WishlistForm({email=null, name=null, country_code='CH', language_code='de'}) {
    let emailInputProps = {
        type: 'email',
        name: 'email',
        id: 'email'
    }
    let nameInputProps = {
        type: 'text',
        name: 'name',
        id: 'name'
    }
    if (email !== null) {
        emailInputProps.defaultValue = email;
    } else {
        emailInputProps.placeholder = 'email@example.com'
    }
    if (name !== null) {
        nameInputProps.defaultValue = name;
    } else {
        nameInputProps.placeholder = 'Enter Wishlist Name'
    }

    return (
    <Form method='post'>
        <div className="mb-3">
            <label htmlFor="name">Wishlist Name</label>
            <input className='form-control' required {...nameInputProps} />
        </div>
        <div className="mb-3">
            <label htmlFor="email">E-Mail</label>
            <input className='form-control' required {...emailInputProps}/>
        </div>
        <div className="mb-3">
            <label htmlFor="country_code">Country Code</label>
            <input className='form-control' type="text" name='country_code' id="country_code" defaultValue={country_code}/>
        </div>
        <div className="mb-3">
            <label htmlFor="language_code">Language Code</label>
            <input className='form-control' type="text" name='language_code' id="language_code" defaultValue={language_code} />
        </div>
        <p className="mb-3">
            <Link className="btn btn-secondary  me-3" type="button" to="..">Cancel</Link>
            <button className="btn btn-primary" type="submit">Submit</button>
        </p>
    </Form>
    );
}

export default WishlistForm;