import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Form, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function SearchForm({wishlist_uuid, setIsLoading, errorMessage, setErrorMessage}) {
    const [shop, setShop] = useState('PlayStation'); // ['PlayStation', 'Nintendo']
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    function handleChange(event) {
        setShop(event.target.value);
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMessage(null);
        const url = `/api/search/game?query=${encodeURIComponent(data.search)}&shop=${shop}&wishlist_uuid=${wishlist_uuid}`;
        console.log(url);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.log(`${res.url} returned ${res.status} ${res.statusText}`);
                setErrorMessage(`Something went wrong! Unable to search for ${data.search} in ${shop} store. Error: ${res.status} ${res.statusText}`);
            }
            const games = await res.json();
            sessionStorage.setItem('games', JSON.stringify(games));
            setIsLoading(false);
            navigate(`/${wishlist_uuid}/search`);
            
        } catch (error) {
            console.error(error);
            setErrorMessage(`Something went wrong! Unable to search for ${data.search} in ${shop} store. Error: ${error}`);    
            setIsLoading(false);
            navigate(`/${wishlist_uuid}/games`);
        }

    };

    return (
        <div className="enhanced-card" style={{
            width: '100%',
            margin: '0',
            background: '#fff'
        }}>
            <div className="card-header" style={{
                background: 'var(--bg-gradient-primary)',
                color: 'white',
                padding: 'var(--spacing-lg)',
                borderRadius: 'var(--card-border-radius) var(--card-border-radius) 0 0',
                textAlign: 'center'
            }}>
                <h5 style={{ 
                    margin: '0',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '1.1rem'
                }}>
                    Search for Games
                </h5>
            </div>
            
            <Form method='post' role="search" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body" style={{ padding: 'var(--spacing-lg)' }}>
                    <div className="mb-4">
                        <div className='d-flex gap-3 justify-content-center'>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    className="platform-radio-input" 
                                    type="radio" 
                                    name="shop" 
                                    id="playstation"  
                                    value="PlayStation" 
                                    defaultChecked 
                                    onChange={handleChange}
                                    style={{
                                        position: 'absolute',
                                        opacity: '0',
                                        width: '100%',
                                        height: '100%',
                                        margin: '0',
                                        cursor: 'pointer'
                                    }}
                                />
                                <label 
                                    className="platform-radio-label" 
                                    htmlFor="playstation"
                                    style={{ 
                                        display: 'inline-block',
                                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                                        borderRadius: '8px',
                                        border: '2px solid #003791',
                                        background: shop === 'PlayStation' ? 'var(--bg-gradient-playstation)' : 'white',
                                        color: shop === 'PlayStation' ? 'white' : '#003791',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        cursor: 'pointer',
                                        transition: 'var(--transition-fast)',
                                        minWidth: '120px',
                                        textAlign: 'center',
                                        boxShadow: shop === 'PlayStation' ? 'var(--card-shadow-medium)' : 'var(--card-shadow-light)',
                                        transform: shop === 'PlayStation' ? 'translateY(-2px)' : 'none'
                                    }}
                                >
                                    PlayStation
                                </label>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    className="platform-radio-input" 
                                    type="radio" 
                                    name="shop" 
                                    id="nintendo"  
                                    value="Nintendo" 
                                    onChange={handleChange}
                                    style={{
                                        position: 'absolute',
                                        opacity: '0',
                                        width: '100%',
                                        height: '100%',
                                        margin: '0',
                                        cursor: 'pointer'
                                    }}
                                />
                                <label 
                                    className="platform-radio-label" 
                                    htmlFor="nintendo"
                                    style={{ 
                                        display: 'inline-block',
                                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                                        borderRadius: '8px',
                                        border: '2px solid #e3342f',
                                        background: shop === 'Nintendo' ? 'var(--bg-gradient-nintendo)' : 'white',
                                        color: shop === 'Nintendo' ? 'white' : '#e3342f',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        cursor: 'pointer',
                                        transition: 'var(--transition-fast)',
                                        minWidth: '120px',
                                        textAlign: 'center',
                                        boxShadow: shop === 'Nintendo' ? 'var(--card-shadow-medium)' : 'var(--card-shadow-light)',
                                        transform: shop === 'Nintendo' ? 'translateY(-2px)' : 'none'
                                    }}
                                >
                                    Nintendo
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex gap-3 align-items-end">
                        <div className="flex-grow-1">
                            <input 
                                className="form-control" 
                                name="search" 
                                type="search" 
                                placeholder="Enter game name..." 
                                aria-label="Search"
                                {...register("search", { required: true })}
                                style={{
                                    borderRadius: '8px',
                                    border: '2px solid #e9ecef',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    transition: 'var(--transition-fast)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <button 
                            className="enhanced-btn enhanced-btn-primary" 
                            type="submit"
                            style={{
                                minWidth: '120px',
                                height: 'fit-content',
                                padding: 'var(--spacing-sm) var(--spacing-lg)',
                                fontSize: '1rem'
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default SearchForm;

