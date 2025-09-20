import 'bootstrap/dist/css/bootstrap.css';
import { useLoaderData, Outlet, useOutletContext } from "react-router-dom";
import WishlistCard from "../../components/cards/WishlistCard";
import AddWishlistCard from "../../components/cards/AddWishlistCard";
import PageTitle from '../../components/layout/PageTitle';

function Wishlists() {
    let errorMessage= null;
    const [wishlists, error] =  useLoaderData();
    errorMessage = error;
    return (
        <>
            <PageTitle title="Wishlist Overview" />
            <div className="container-fluid">
                {errorMessage && (
                    <div className="alert alert-danger" role="alert" style={{ 
                        margin: 'var(--spacing-lg)',
                        borderRadius: 'var(--card-border-radius)',
                        boxShadow: 'var(--card-shadow-light)'
                    }}>
                        {errorMessage}
                    </div>
                )}
                
                <div className="enhanced-card-grid">
                    {wishlists.length > 0 && (
                        <>
                            {wishlists.map((wishlist) => <WishlistCard 
                                key={wishlist.uuid} 
                                uuid={wishlist.uuid} 
                                name={wishlist.name} 
                                email={wishlist.email} 
                                country={wishlist.country_code} 
                                language={wishlist.language_code} />)}
                        </> 
                    )}
                    
                    {wishlists.length === 0 && (
                        <div style={{ 
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: 'var(--spacing-xl)', 
                            color: '#333',
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 'var(--card-border-radius)',
                            margin: 'var(--spacing-lg)',
                            boxShadow: 'var(--card-shadow-light)'
                        }}>
                            <h2 style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>
                                There are no wishlists yet
                            </h2>
                            <p style={{ fontSize: '1.1rem', opacity: '0.8' }}>
                                Start bargain hunting by adding a new one
                            </p>
                        </div>
                    )}
                    
                    <AddWishlistCard />
                </div>
                
                <Outlet />
            </div>
        </>
    );
}

export default Wishlists;

export async function loader() {
    try {
        const response = await fetch('/api/wishlist/all');
        if (!response.ok) {
            console.error(error);
            return [[], `An error occured while loading wishlists from backend. Error: ${error}`];
        }
        console.log(response);
        const wishlists = await response.json();
        return [wishlists, null];
    } catch (error) {
        console.error(error);
        return [[], 'Unable to load wishlists from backend. Please try again later.'];
    }
}