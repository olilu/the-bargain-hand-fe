import {useEffect, useState} from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import CardList from "../../components/lists/CardList";
import {loader as wishlistGamesLoader} from './WishlistGames'
import 'bootstrap/dist/css/bootstrap.css';

function WishlistSearch() {
    const games = useLoaderData();
    const wishlist = useOutletContext();
    const [addedGames, setAddedGames] = useState([])
    const locales = `${wishlist.language_code}-${wishlist.country_code}`

    useEffect(() => {
        async function fetchAddedGames() {
            const WishlistGames = await wishlistGamesLoader({params: {uuid: wishlist.uuid}});
            setAddedGames(WishlistGames);
        }
        fetchAddedGames();
    }, []);

    return (
        <>
            <CardList games={games} locales={locales} type='search' addedGames={addedGames} />
        </>
    );
}

export default WishlistSearch;

export async function loader() {
    const searchList = JSON.parse(sessionStorage.getItem("games"));
    return searchList;
}