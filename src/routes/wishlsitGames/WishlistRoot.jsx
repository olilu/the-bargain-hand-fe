import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from '../../components/forms/SearchForm';
import { Outlet, useOutletContext, useLoaderData } from 'react-router';

function WishlistRoot() {
    const wishlist = useLoaderData();
    const [title, setTitle] = useOutletContext();
    setTitle(`Wishlist ${wishlist.name}`);
    return (
        <>
            <div className="d-flex justify-content-center">
                <SearchForm />
            </div>
            <hr />
            <Outlet context={wishlist}/>
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