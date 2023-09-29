import { useLoaderData, useOutletContext } from "react-router-dom";
import GameCard from "../../components/cards/GameCard";
import 'bootstrap/dist/css/bootstrap.css';

function WishlistGames() {
    const wishlist = useOutletContext();
    const games = useLoaderData();
    //const [title, setTitle] = useOutletContext();
    //setTitle(`Wishlist ${wishlist.name}`);
    const locales = `${wishlist.language_code}-${wishlist.country_code}`
    console.log(locales);
    return (
        <>
            <div className="row container-fluid justify-content-md-center">
                {games.length > 0 && (
                    <>
                        {games.map((game) => <GameCard
                            key={game.game_id}
                            id={game.game_id}
                            img_link={game.img_link}
                            name={game.name}
                            link={game.link}
                            shop={game.shop}
                            wishlist_id={game.wishlist_uuid}
                            price={game.price_new}
                            price_old={game.price_old}
                            currency={game.currency}
                            locales={locales}
                            on_sale={game.on_sale}
                            type='list'
                        />)}
                    </>
                )}
                {games.length === 0 && (
                    <div className="mt-3 text-black text-center">
                        <h2>There are no games yet</h2>
                        <p>Start your wihlist by searching for games</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default WishlistGames;

export async function loader({ params }) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${params.uuid}/games`);
    let games = [];
    if (!response.ok) {
        console.error(error);
    }
    games = await response.json();
    return games;
}