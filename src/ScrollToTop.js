import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      this.props.setLocation(this.props.location);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
