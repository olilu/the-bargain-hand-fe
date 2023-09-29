import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function SearchForm() {
    const [shop, setShop] = useState('PlayStation'); // ['PlayStation', 'Nintendo']
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    function handleChange(event) {
        setShop(event.target.value);
    }

    const onSubmit = async (data) => {
        console.log("shop: " + shop);
        console.log("search data: " + data.search);
    };

    return (
        <>
            <Form method='post' className="col-6" role="search" onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex justify-content-start mb-2'>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="radio" name="shop" id="playstation"  value="PlayStation" defaultChecked onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="playstation">
                            PlayStation
                        </label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input className="form-check-input" type="radio" name="shop" id="nintendo"  value="Nintendo" onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="nintendo">
                            Nintendo
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <input className="form-control me-2" name="search" type="search" placeholder="Search" aria-label="Search" {...register("search", { required: true })}/>
                    <button className="btn btn-dark" type="submit">Search</button>
                </div>
            </Form>
        </>
    );
}

export default SearchForm;

