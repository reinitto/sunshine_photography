import React, { Component } from "react";

class LazyBackground extends Component {
  state = { src: null };

  componentDidMount() {
    const { src } = this.props;
    const imageLoader = new Image();
    imageLoader.src = src;
    imageLoader.onload = () => {
      this.setState({ src });
    };
  }

  render() {
    const { style, src, ...rest } = this.props;
    return (
      <div
        {...rest}
        style={{
          backgroundImage: `url(${this.state.src})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          ...style,
        }}
      />
    );
  }
}

export default LazyBackground;
