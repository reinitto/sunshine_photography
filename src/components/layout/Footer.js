import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

// import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer
      className="page-footer font-small mdb-color pt-4"
      style={{
        background: "rgba(169,169,169,0.3)"
      }}
    >
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left mt-3 pb-3">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Sunshine Pictures
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            {/* <h6 className="text-uppercase mb-4 font-weight-bold">Portfoliio</h6>
            <p>
              <Link to={"/gallery#baby"}>Baby photos</Link>
            </p>
            <p>
              <Link to={"/gallery#family"}>Family photos</Link>
            </p> */}
            {/* <p>
              <Link to={"/gallery#portrait"}>Portrait photos</Link>
            </p>
            <p>
              <Link to={"/gallery#event"}>Event photos</Link>
            </p> */}
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            {/* <h6 className="text-uppercase mb-4 font-weight-bold">Menu</h6>
            <p>
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </p>
            <p>
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </p>
            <p>
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </p>
            <p>
              <Link to={"/journal"} className="nav-link">
                Journal
              </Link>
            </p>
            <p>
              <Link to={"/Pricing"} className="nav-link">
                Pricing
              </Link>
            </p> */}
          </div>

          <hr className="w-100 clearfix d-md-none" />

          {/* <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              info@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-3" /> + 01 234 567
              88
            </p>
            <p>
              <FontAwesomeIcon icon={faHome} className="mr-3" /> Telemark,
              Norway
            </p> */}
          {/* <div className="col-md-5 col-lg-4 ml-lg-0"> */}
          {/* <div className="text-center">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    href="!#"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <FontAwesomeIcon
                      size={"2x"}
                      icon={faFacebook}
                      className="mr-3"
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="!#"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      size={"2x"}
                      className="mr-3"
                    />
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>

        <hr />

        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © 2020 Copyright:
              <Link to="!#">
                <strong> thisWebsite.com</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
