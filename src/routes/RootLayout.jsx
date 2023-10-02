import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import 'bootstrap/dist/css/bootstrap.css';

function RootLayout() {
  
  const [title, setTitle] = useState(['Wishlists Overview'])

  return (
    <>
        <Navigation title={title}/>
        <main className="row justify-content-md-center">
          <div className="col col-lg-2">
          </div>
          <div className="mt-2 col-lg-8">
            <Outlet context={[title, setTitle]}/>
          </div>
          <div className="col col-lg-2">
          </div>
        </main>
    </>
  );
}

export default RootLayout;