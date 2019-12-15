import React, { Component } from "react";
import CameraOnly from "../../logo/camera-logo.svg";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    scrollTop: 0,
    windowWidth: null
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleWidth);
    this.handleWidth();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleWidth);
  }

  handleWidth = () => {
    let width = document.documentElement.clientWidth;
    this.setState({
      windowWidth: width
    });
  };

  handleScroll = () => {
    var scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    this.setState({
      scrollTop
    });
  };
  render() {
    let { scrollTop } = this.state;

    return (
      <nav
        style={{ zIndex: "100 " }}
        className={`navbar navbar-expand-md fixed-top
         ${
           window.location.pathname.length === 1 && scrollTop > 0
             ? "bg-base border-bottom border-secondary"
             : ""
         }
         ${
           window.location.pathname.length === 1 && scrollTop === 0
             ? "bg-transparent"
             : ""
         }
         ${
           window.location.pathname.length > 1
             ? "bg-base border-bottom border-secondary"
             : ""
         }
    `}
      >
        <Link
          className="navbar-brand"
          to="/"
          style={{
            height: "60px",
            marginBottom: "1rem",
            margin: this.state.windowWidth < 776 ? "auto" : "initial"
          }}
        >
          {" "}
          Sunshine
          <img
            src={CameraOnly}
            style={{
              maxHeight: "100%",
              maxWidth: "100%"
            }}
            alt=""
          />{" "}
          Photography
        </Link>
        <button
          // style={{
          //   margin: "auto"
          // }}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              marginTop: this.state.windowWidth < 439 ? "0rem" : "initial"
            }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to={"/journal"} className="nav-link">
                Journal
              </Link>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => {
                document.querySelector(".dropdown-menu").classList.add("show");
              }}
              onMouseLeave={() => {
                document
                  .querySelector(".dropdown-menu")
                  .classList.remove("show");
              }}
            >
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gallery
              </Link>
              <div
                className={`dropdown-menu mt-0 border-top-0 pt-0 ${
                  window.location.pathname === "/" && scrollTop === 0
                    ? "bg-transparent"
                    : "bg-base"
                } `}
                aria-labelledby="navbarDropdownMenuLink"
                onMouseLeave={() => {
                  document
                    .querySelector(".dropdown-menu")
                    .classList.remove("show");
                }}
              >
                <Link className="dropdown-item" to="/gallery#baby">
                  Baby
                </Link>
                <Link className="dropdown-item" to="/gallery#family">
                  Family
                </Link>
                <Link className="dropdown-item" to="/gallery#portrait">
                  Portrait
                </Link>
                <Link className="dropdown-item" to="/gallery#event">
                  Event
                </Link>
              </div>
            </li>

            <li>
              <Link
                to={"/pricing"}
                className="nav-link"
                style={{
                  textAlign: this.state.windowWidth < 439 ? "center" : "left"
                }}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
