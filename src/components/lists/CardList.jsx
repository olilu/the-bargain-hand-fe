import GameCard from "../cards/GameCard";
import 'bootstrap/dist/css/bootstrap.css';

function CardList({ games, type, locales, addedGames = [] }) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    return (
        <div className="row container-fluid justify-content-md-center">
            {games.length > 0 && (
                <>
                    {games.map((game) => <GameCard
                        key={game.game_id + getRandomInt(100)}
                        game={game}
                        locales={locales}
                        type={type}
                        addedGames={addedGames}
                    />)}
                </>
            )}
            {games.length === 0 && (
                <div className="mt-3 text-black text-center">
                    {type === 'games' && (
                        <>
                            <h2>There are no games yet</h2>
                            <p>Start your wihlist by searching for games</p>
                        </>
                    )}
                    {type === 'search' && (
                        <>
                            <h2>There are no games matching your search</h2>
                            <p>Try searching for another game</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardList;