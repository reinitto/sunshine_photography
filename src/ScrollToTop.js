import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const {
      location: { pathname, hash },
    } = this.props;

    // dont scroll to top on language change
    let prev_path = "" + prevProps.location.pathname;
    let curr_path = "" + this.props.location.pathname;
    if (
      prev_path.split("/").slice(2).join("") !==
      curr_path.split("/").slice(2).join("")
    ) {
      if (
        pathname !== prevProps.location.pathname ||
        hash !== prevProps.location.hash
      ) {
        const element = document.getElementById(hash.replace("#", ""));
        window.scrollTo({
          behavior: element ? "smooth" : "auto",
          top: element ? element.offsetTop : 0,
        });
        // window.scrollTo(0, 0);
        this.props.setLocation(this.props.location);
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
