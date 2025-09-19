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
        <div className={`card my-3 mx-2 px-2 py-2 text-white ${colortype}`} style={{ "width": "14rem" }}>
            <Link to={game.link} className="link-light text-decoration-none" target='_blank' rel='noopener noreferrer'>
                {game.shop === 'Nintendo' && (<img src={game.img_link} className="img-thumbnail" alt={game.name} style={{'maxWidth': "100%", height: "206px", 'objectFit': "cover"}}/>)}
                {game.shop === 'PlayStation' && (<img src={game.img_link} className="img-thumbnail" alt={game.name} />)}
            </Link>
            <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted"><span className="badge bg-primary">{game.shop}</span></h6>
                {game.on_sale
                    ? (<p className='card-text'><span className="badge bg-success fs-6">{formatPrice(game.price_new)}</span> <span className='text-decoration-line-through font-size-sm'>{formatPrice(game.price_old)}</span></p>)
                    : (<p className='card-text'>{formatPrice(game.price_new)}</p>)
                }   
            </div>
            <div className='card-footer'>                
                {(type === 'search' && !(added)) && (
                    <Button disabled={disabled} variant="success" className='btn-sm' onClick={handleAdd} style={{'boxShadow': '0 .125rem .25rem #000000'}}>
                        {disabled 
                            ? (<MdCheckCircleOutline size={20} />)
                            : (<span>Add</span>)}
                    </Button>
                )}
                {type === 'list' && (
                    <Button disabled={disabled} variant="outline-danger" className='btn-sm' onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    )
}

export default GameCard;  