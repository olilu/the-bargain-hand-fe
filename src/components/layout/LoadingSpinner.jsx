import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="dark" />
            <span className="ms-2">Scraping... This might take a while.</span>
        </div>
    );
}

export default LoadingSpinner;