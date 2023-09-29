import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from '../../components/forms/SearchForm';
import { Outlet } from 'react-router';

function WishlistRoot() {
    return (
        <>
            <div className="d-flex justify-content-center">
                <SearchForm />
            </div>
            <hr />
            <Outlet />
        </>

    );

};

export default WishlistRoot;