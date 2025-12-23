import { Link } from "react-router-dom";
import amazonlogo from "../images/amazonLogo.png";
import { checkUserLoginStatus } from "../utils/utils";
import { useState } from "react";
import { searchSuggetionApi } from "../services/searchService";

function NavBar() {
  const [isUserLoggedin, setIsUserLoggedin] = useState(checkUserLoginStatus());
  let [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [searchword, setSearchWord] = useState("");
  const [searchSuggestionsList, setSearchSuggestionsList] = useState([]);

  const logoutUser = () => {
    localStorage.clear();
    setIsUserLoggedin(false);
    window.location ='/';
  }

  const searchHandler = async (e) =>{
    setSearchWord(e.target.value);
    

    if(searchword.length > 0){
      try {
        let apiResponse = await searchSuggetionApi({"searchWord": searchword});
        let searchSuggestionsValues = apiResponse.data.data.map( suggestion =>{
          return suggestion.value
        } );

        setSearchSuggestionsList(searchSuggestionsValues);

        setShowSearchDropdown(true);
      } catch (error) {
        alert("unable to process your request dude");
      }
      
    }
  }

  const handleSearchClick = (suggestion) => {
    console.log(suggestion);
    window.location = "/product-search?keyword="+suggestion;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarTogglerDemo01"
          >
            <Link to="/">
              <img
                src={amazonlogo}
                className="img-fluid"
                width={100}
                height={100}
                alt="Amazon Logo"
              />
            </Link>

            

            <div className="input-group ms-3 me-1">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Action before</a></li>
                <li><a className="dropdown-item" href="/">Another action before</a></li>
                <li><a className="dropdown-item" href="/">Something else here</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="/">Separated link</a></li>
              </ul>
              <input type="text" className="form-control" onChange={e => searchHandler(e)}  />
              <button className="btn btn-outline-secondary " type="button"  ><i className="bi bi-search"></i></button>
              { showSearchDropdown === true && 
                <div className="dropdown-search shadow">
                  {
                    searchSuggestionsList.map( (suggestion, i) => (
                      <div className="suggestion-item" key={i} onClick={e => handleSearchClick(suggestion)}>
                        <i className="bi bi-search "></i> {suggestion}
                      </div>
                    ))
                  }          
              </div>
              }
              
            </div>

            <div className="d-flex">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className="nav-link">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact Us
                  </Link>
                </li>

                <li className="nav-item">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="fs-6">Hello, Man</span>
                        </button>
                        { isUserLoggedin === false && 
                            <ul className="dropdown-menu">
                                <li>
                                <Link className="dropdown-item" to="/login">
                                    Login
                                </Link>
                                </li>
                                <li>
                                <Link className="dropdown-item" to="/signup">
                                    New Customers?
                                    <span className="text-primary">start here</span>
                                </Link>
                                </li>
                            </ul>
                        }
                        { isUserLoggedin === true && 
                            <ul className="dropdown-menu">
                                <li>
                                  <Link to="/cart"  className="dropdown-item" >
                                    Cart 
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/address"  className="dropdown-item" >
                                    Manage Addresses
                                  </Link>
                                </li>
                                <li>
                                  <button onClick={logoutUser} className="dropdown-item" >
                                      Logout
                                  </button>
                                </li>
                                
                            </ul>
                        }
                    
                    </div>
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;
