import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function GameCard({ id, img_link, link, name, shop, price, price_old, currency, locale, on_sale, type, wishlist_id }) {
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    let colortype = 'bg-dark';
     if (type === 'search') {
        colortype = 'bg-secondary';
    }
    function gameAlreadyAdded(){
        for (let i = 0; i < originalPictures.length; i++) {
            if (originalPictures[i].id === id) {
                colortype = 'bg-success';
                return true;
            }
        }
        return false;
    }

    if (type === 'search' && gameAlreadyAdded()) {
        colortype = 'bg-success';
    }

    if (on_sale) {
        colortype = 'bg-info';
    }

    function formatPrice(price) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(price);
    }

    async function addGame() {
        console.log(`add game ${name}`);
    }

    async function deleteGame() {
        console.log(`delete game ${name}`);
        navigate(0);
    }

    const handleAdd = () => {
        setDisabled(true);
        addGame();
    }

    const handleDelete = () => {   
        setDisabled(true);
        deleteGame();
    }

    return (
        <div className={`card my-3 mx-2 px-2 py-2 text-white ${colortype}`} style={{ "width": "14rem" }}>
            <Link to={link} className="link-light text-decoration-none" target='_blank' rel='noreferrer'>
                {shop === 'Nintendo' && (<img src={img_link} className="img-thumbnail" alt={name} style={{'max-width': "100%", height: "206px", 'object-fit': "cover"}}/>)}
                {shop === 'PlayStation' && (<img src={img_link} className="img-thumbnail" alt={name} />)}
            </Link>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><span class="badge bg-primary">{shop}</span></h6>
                {on_sale
                    ? (<p className='card-text'><span class="badge bg-success fs-6">{formatPrice(price)}</span> <span className='text-decoration-line-through font-size-sm'>{formatPrice(price)}</span></p>)
                    : (<p className='card-text'>{formatPrice(price)}</p>)
                }   
            </div>
            <div className='card-footer'>                
                {type === 'search' && (
                    <Button disabled={disabled || gameAlreadyAdded()} variant="success" className='btn-sm' onClick={{handleAdd}}>
                        Add
                    </Button>
                )}
                {type === 'list' && (
                    <Button disabled={disabled} variant="outline-danger" className='btn-sm' onClick={{handleDelete}}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    )
}

export default GameCard;  