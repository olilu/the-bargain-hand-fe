import GameCard from "../cards/GameCard";
import 'bootstrap/dist/css/bootstrap.css';

function CardList({ games, type, locales, addedGames = [] }) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    return (
        <div className="container-fluid">
            {games.length > 0 && (
                <div className="enhanced-card-grid">
                    {games.map((game) => <GameCard
                        key={game.game_id + getRandomInt(100)}
                        game={game}
                        locales={locales}
                        type={type}
                        addedGames={addedGames}
                    />)}
                </div>
            )}
            {games.length === 0 && (
                <div className="text-center" style={{ 
                    padding: 'var(--spacing-xl)', 
                    color: '#333',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 'var(--card-border-radius)',
                    margin: 'var(--spacing-lg)',
                    boxShadow: 'var(--card-shadow-light)'
                }}>
                    {type === 'games' && (
                        <>
                            <h2 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>
                                There are no games yet
                            </h2>
                            <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>
                                Start your wishlist by searching for games
                            </p>
                        </>
                    )}
                    {type === 'search' && (
                        <>
                            <h2 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>
                                There are no games matching your search
                            </h2>
                            <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>
                                Try searching for another game
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardList;