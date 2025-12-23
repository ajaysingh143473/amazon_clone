import Footer from "./shared/Footer";
import NavBar from "./shared/NavBar";


function Home(){

    return(
        <div className="container-fluid">
            <NavBar/>
            <div className="row">
                <h3 className="text-danger">This is Amazon App home page</h3>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;