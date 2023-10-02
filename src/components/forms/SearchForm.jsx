import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function SearchForm({wishlsit_uuid, setIsLoading}) {
    const [shop, setShop] = useState('PlayStation'); // ['PlayStation', 'Nintendo']
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    function handleChange(event) {
        setShop(event.target.value);
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log("shop: " + shop);
        console.log("search data: " + data.search);
        console.log("wishlist_uuid: " + wishlsit_uuid);
        const url = `${import.meta.env.VITE_BACKEND_URL}/search/game?query=${encodeURIComponent(data.search)}&shop=${shop}&wishlist_uuid=${wishlsit_uuid}`;
        console.log(url);
        const res = await fetch(url);
        if (!res.ok) {
            console.error(error);
            console.log(`${res.url} returned ${res.status} ${res.statusText}`);
        }
        const games = await res.json();
        console.log(games);
        sessionStorage.setItem('games', JSON.stringify(games));
        setIsLoading(false);
        navigate(`/${wishlsit_uuid}/search`);
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

