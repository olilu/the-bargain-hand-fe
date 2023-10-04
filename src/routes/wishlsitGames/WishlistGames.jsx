import { useLoaderData, useOutletContext } from "react-router-dom";
import CardList from "../../components/lists/CardList";
import 'bootstrap/dist/css/bootstrap.css';

function WishlistGames() {
    const wishlist = useOutletContext();
    const games = useLoaderData();
    const locales = `${wishlist.language_code}-${wishlist.country_code}`
    return (
        <>
            {games.length === 0 && (
                <div className="mt-3 text-black text-center">
                    <h2>There are no games in this wishlist</h2>
                    <p>Start by searching for a game</p>
                </div>
            )}
            <CardList games={games} locales={locales} type='list'/>
        </>
    );
}

export default WishlistGames;

export async function loader({ params }) {
    const response = await fetch(`/api/wishlist/${params.uuid}/games`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const games = await response.json();
    return games;
}