import { useLoaderData, useOutletContext } from "react-router-dom";
import CardList from "../../components/lists/CardList";
import 'bootstrap/dist/css/bootstrap.css';

function WishlistGames() {
    const wishlist = useOutletContext();
    const games = useLoaderData();
    const locales = `${wishlist.language_code}-${wishlist.country_code}`
    return (
        <>
            <CardList games={games} locales={locales} type='list'/>
        </>
    );
}

export default WishlistGames;

export async function loader({ params }) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${params.uuid}/games`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const games = await response.json();
    return games;
}