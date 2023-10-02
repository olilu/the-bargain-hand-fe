import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useOutletContext, useLoaderData } from 'react-router';
import { useState } from 'react';
import SearchForm from '../../components/forms/SearchForm';
import LoadingSpinner from '../../components/layout/LoadingSpinner';

function WishlistRoot() {
    const wishlist = useLoaderData();
    const [title, setTitle] = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    setTitle(`Wishlist ${wishlist.name}`);
    return (
        <>
            <div className="d-flex justify-content-center">
                <SearchForm wishlsit_uuid={wishlist.uuid} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
            <hr />
            {isLoading 
                ? (<LoadingSpinner />) 
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