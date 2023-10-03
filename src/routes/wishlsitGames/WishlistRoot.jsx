import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useOutletContext, useLoaderData } from 'react-router';
import { useState } from 'react';
import SearchForm from '../../components/forms/SearchForm';
import LoadingPacman from '../../components/layout/LoadingPacman';

function WishlistRoot() {
    const wishlist = useLoaderData();
    const [title, setTitle] = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    setTitle(`Wishlist ${wishlist.name}`);
    return (
        <>
            <div className="d-flex justify-content-center">
                <SearchForm 
                    wishlsit_uuid={wishlist.uuid}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </div>
            <hr />
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            {isLoading 
                ? (<><LoadingPacman /></>) 
                : (<Outlet context={wishlist}/>)}
        </>

    );

};

export default WishlistRoot;

export async function loader({params}) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${params.uuid}`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const wishlist = await response.json();
    return wishlist;
}