import { Link } from "react-router-dom";
import amazonlogo from "../images/amazonLogo.png";

function Footer() {
  return (
    <>
      
      <div className="container-fluid bg-secondary text-center py-3">
        <Link to="/" className="text-decoration-none text-white fw-semibold">
          Back to top
        </Link>
      </div>

      
      <div className="container-fluid bg-navi text-white p-5">
        <div className="row mb-5">
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Get to Know Us</h5>
            <Link to="/" className="text-decoration-none text-white d-block">About Amazon</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Careers</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Press Releases</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Amazon Science</Link>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Connect with Us</h5>
            <Link to="/" className="text-decoration-none text-white d-block">Facebook</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Twitter</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Instagram</Link>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Make Money with Us</h5>
            <Link to="/" className="text-decoration-none text-white d-block">Sell on Amazon</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Sell under Amazon Accelerator</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Protect and Build Your Brand</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Amazon Global Selling</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Supply to Amazon</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Become an Affiliate</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Fulfilment by Amazon</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Advertise Your Products</Link>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Let Us Help You</h5>
            <Link to="/" className="text-decoration-none text-white d-block">Your Account</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Returns Centre</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Amazon App Download</Link>
            <Link to="/" className="text-decoration-none text-white d-block">Help</Link>
          </div>
        </div>

        <hr className="border-light" />

        <div className="row justify-content-center mt-4">
          <div className="col-1">
            <Link to="/">
              <img src={amazonlogo} alt="Amazon Logo" width={100} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
