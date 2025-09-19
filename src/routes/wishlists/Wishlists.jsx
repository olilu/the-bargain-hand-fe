import 'bootstrap/dist/css/bootstrap.css';
import { useLoaderData, Outlet, useOutletContext } from "react-router-dom";
import WishlistCard from "../../components/cards/WishlistCard";
import AddWishlistCard from "../../components/cards/AddWishlistCard";
import PageTitle from '../../components/layout/PageTitle';

function Wishlists() {
    let errorMessage= null;
    const [wishlists, error] =  useLoaderData();
    errorMessage = error;
    return (
        <>
            <PageTitle title="Wishlist Overview" />
            <div className="row container-fluid justify-content-md-center">
                {wishlists.length > 0 && (
                    <>
                        {wishlists.map((wishlist) => <WishlistCard 
                            key={wishlist.uuid} 
                            uuid={wishlist.uuid} 
                            name={wishlist.name} 
                            email={wishlist.email} 
                            country={wishlist.country_code} 
                            language={wishlist.language_code} />)}
                    </> 
                )}
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                {wishlists.length === 0 && (
                    <div className="mt-3 text-black text-center">
                        <h2>There are no wishlists yet</h2>
                        <p>Start bargain hunting by adding a new one</p>
                    </div>
                )}
                <Outlet />
                <AddWishlistCard />
            </div>
        </>
    );
}

export default Wishlists;

export async function loader() {
    try {
        const response = await fetch('/api/wishlist/all');
        if (!response.ok) {
            console.error(error);
            return [[], `An error occured while loading wishlists from backend. Error: ${error}`];
        }
        console.log(response);
        const wishlists = await response.json();
        return [wishlists, null];
    } catch (error) {
        console.error(error);
        return [[], 'Unable to load wishlists from backend. Please try again later.'];
    }
}