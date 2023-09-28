import 'bootstrap/dist/css/bootstrap.css';
import { useLoaderData } from "react-router-dom";
import WishlistCard from "../components/cards/WishlistCard";
import AddListCard from "../components/cards/AddWishlistCard";

function Wishlists() {
    const wishlists =  useLoaderData();
    return (
        <>
            <div className="row container-fluid justify-content-md-center">
                {wishlists.length > 0 && (
                    <>
                        {wishlists.map((wishlist) => <WishlistCard key={wishlist.uuid} uuid={wishlist.uuid} name={wishlist.name} email={wishlist.email} country={wishlist.country_code} language={wishlist.language_code} />)}
                    </> 
                )}
                <AddListCard />
            </div>
        </>
    );
}

export default Wishlists;

export async function loader() {
    const response = await fetch('http://localhost:8080/wishlist/all');
    const wishlists = await response.json();
    console.log(wishlists);
    return wishlists;
};