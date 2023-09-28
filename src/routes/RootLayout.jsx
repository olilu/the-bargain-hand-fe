import { Outlet } from "react-router-dom";
import MainHeader from "../components/layout/MainHeader";
import 'bootstrap/dist/css/bootstrap.css'

function RootLayout() {
  return (
    <>
        <MainHeader />
        <main className="row justify-content-md-center">
          <div className="col col-lg-2">
          </div>
          <div className="mt-2 col-lg-8">
            <Outlet />
          </div>
          <div className="col col-lg-2">
          </div>
        </main>
    </>
  );
}

export default RootLayout;