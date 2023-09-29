import 'bootstrap/dist/css/bootstrap.css';
import { useLoaderData, Outlet, useOutletContext } from "react-router-dom";
import WishlistCard from "../../components/cards/WishlistCard";
import AddWishlistCard from "../../components/cards/AddWishlistCard";
import { set } from 'react-hook-form';

function Wishlists() {
    const [title, setTitle] = useOutletContext();
    setTitle('Wishlists Overview');
    const wishlists =  useLoaderData();
    return (
        <>
            <div className="row container-fluid justify-content-md-center">
                {wishlists.length > 0 && (
                    <>
                        {wishlists.map((wishlist) => <WishlistCard key={wishlist.uuid} uuid={wishlist.uuid} name={wishlist.name} email={wishlist.email} country={wishlist.country_code} language={wishlist.language_code} />)}
                    </> 
                )}
                <Outlet />
                <AddWishlistCard />
            </div>
        </>
    );
}

export default Wishlists;

export async function loader() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/all`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const wishlists = await response.json();
    return wishlists;
};