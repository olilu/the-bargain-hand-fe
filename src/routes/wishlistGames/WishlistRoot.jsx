import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useOutletContext, useLoaderData } from 'react-router';
import { useState } from 'react';
import SearchForm from '../../components/forms/SearchForm';
import LoadingPacman from '../../components/layout/LoadingPacman';
import PageTitle from '../../components/layout/PageTitle';

function WishlistRoot() {
    const wishlist = useLoaderData();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    return (
        <>
            <PageTitle title={`Wishlist: ${wishlist.name}`} />
            <div className="container-fluid" style={{ padding: 'var(--spacing-lg)' }}>
                <div className="row mb-4">
                    <div className="col-12">
                        <SearchForm
                            wishlist_uuid={wishlist.uuid}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </div>
                </div>
                
                {errorMessage && (
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 col-lg-8">
                            <div className="alert alert-danger" role="alert" style={{
                                borderRadius: 'var(--card-border-radius)',
                                border: 'none',
                                boxShadow: 'var(--card-shadow-light)',
                                background: '#f8d7da',
                                color: '#721c24',
                                fontWeight: 'var(--font-weight-medium)'
                            }}>
                                {errorMessage}
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="row">
                    <div className="col-12">
                        {isLoading
                            ? (<LoadingPacman />)
                            : (<Outlet context={wishlist} />)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishlistRoot;

export async function loader({ params }) {
    const response = await fetch(`/api/wishlist/${params.uuid}`);
    if (!response.ok) {
        console.error(error);
        return [];
    }
    const wishlist = await response.json();
    return wishlist;
}