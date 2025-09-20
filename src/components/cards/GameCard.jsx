import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { MdCheckCircleOutline } from "react-icons/md";
import Button from 'react-bootstrap/Button';

function GameCard({ game, locale, type, addedGames }) {
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let added = false
    let colortype = 'bg-dark';

    function gameAlreadyAdded(){
        for (let i = 0; i < addedGames.length; i++) {
            if (addedGames[i].game_id === game.game_id) {
                return true;
            }
        }
        return false;
    }

    if (type === 'search' ) {
        added = gameAlreadyAdded()
        if (added) {
            colortype = 'bg-success';
        } else {
            colortype = 'bg-secondary';
        }
    }

    function formatPrice(price) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: game.currency,
        }).format(price);
    }
    
    function handleAdd() {
        setDisabled(true);
        colortype = 'bg-success';
        addGame();
    }

    function handleDelete() {   
        setDisabled(true);
        deleteGame();
    }

    async function addGame() {
        console.log(`add game ${game.name}`);
        const url = `/api/wishlist/${game.wishlist_uuid}/add-game`;
        const data = {
            wishlist_uuid: game.wishlist_uuid,
            game_id: game.game_id,
            name: game.name,
            shop: game.shop,
            price_new: game.price_new,
            price_old: game.price_old,
            currency: game.currency,
            on_sale: game.on_sale,
            img_link: game.img_link,
            link: game.link
        };
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            console.error(error);
            console.log(`${res.url} returned ${res.status} ${res.statusText}`);
        }
    }

    async function deleteGame() {
        console.log(`delete game ${game.name}`);
        const url = `/api/wishlist/${game.wishlist_uuid}/remove-game/${game.game_id}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            console.error(error);
            console.log(`${res.url} returned ${res.status} ${res.statusText}`);
        }
        navigate(location.pathname, { replace: true });
    }

    return (
        <div className={`enhanced-card ${game.shop === 'Nintendo' ? 'platform-nintendo' : 'platform-playstation'} ${added ? 'enhanced-card-added' : ''} text-white ${colortype}`} 
             style={{ height: 'var(--card-height-game)' }}>
            <Link to={game.link} className="link-light text-decoration-none" target='_blank' rel='noopener noreferrer'>
                <div className="enhanced-card-image-container">
                    <img src={game.img_link} className="enhanced-card-image" alt={game.name} />
                </div>
            </Link>
            <div className="card-body d-flex flex-column justify-content-between" style={{ 
                height: 'calc(var(--card-height-game) - var(--card-image-height) - 50px)', 
                padding: 'var(--spacing-md)' 
            }}>
                <div>
                    <h5 className="card-title" style={{ 
                        fontSize: '0.95rem', 
                        fontWeight: 'var(--font-weight-semibold)', 
                        lineHeight: '1.3', 
                        marginBottom: 'var(--spacing-sm)',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>{game.name}</h5>
                    
                    <h6 className="card-subtitle" style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <span className={`badge ${game.shop === 'Nintendo' ? 'text-bg-danger' : 'text-bg-primary'}`} 
                              style={{ fontSize: '0.7rem', fontWeight: 'var(--font-weight-medium)' }}>
                            {game.shop}
                        </span>
                    </h6>
                </div>
                
                <div>
                    {game.on_sale
                        ? (<p className='card-text mb-0'>
                               <span className="badge bg-success me-2" style={{ 
                                   fontWeight: 'var(--font-weight-semibold)',
                                   fontSize: '0.8rem'
                               }}>
                                   {formatPrice(game.price_new)}
                               </span>
                               <span className='text-decoration-line-through' style={{ 
                                   fontSize: '0.75rem', 
                                   opacity: '0.7'
                               }}>
                                   {formatPrice(game.price_old)}
                               </span>
                           </p>)
                        : (<p className='card-text mb-0' style={{ 
                               fontWeight: 'var(--font-weight-semibold)',
                               fontSize: '0.9rem'
                           }}>
                               {formatPrice(game.price_new)}
                           </p>)
                    }   
                </div>
            </div>
            <div className='card-footer' style={{ 
                borderTop: 'none', 
                background: 'transparent', 
                padding: 'var(--spacing-sm) var(--spacing-md)',
                height: '50px',
                display: 'flex',
                alignItems: 'center'
            }}>                
                {(type === 'search' && !(added)) && (
                    <Button disabled={disabled} className='enhanced-btn enhanced-btn-primary btn-sm w-100' onClick={handleAdd}>
                        {disabled 
                            ? (<MdCheckCircleOutline size={16} />)
                            : (<span>Add to Wishlist</span>)}
                    </Button>
                )}
                {type === 'list' && (
                    <Button disabled={disabled} className='enhanced-btn enhanced-btn-danger btn-sm w-100' onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    )
}

export default GameCard;  