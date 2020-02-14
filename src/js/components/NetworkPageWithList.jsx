import React, { Component } from "react";
import ResponsiveList from "./ResponsiveList";
import Request from "../models/Request";
import { withRouter } from "react-router-dom";
import BadRequestError from "../errors/BadRequestError";

class PageWithList extends Component {
  state = {
    data: [],
    total: 0
  };

  constructor(props) {
    super(props);
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      if (key === "dir") value = value < 0 ? false : true;
      else if (key !== "sort") value = parseInt(value);
      this.state[key] = value;
    });
  }

  makeRequest = async params => {
    let link = this.props.link;
    if (params) link = link.concat(this.serialize(params));
    this.props.setIsLoading(true);
    try {
      const { data, total } = await Request.call({
        reqMethod: this.props.method,
        link
      });
      this.setState({ data, total });
    } catch (e) {
      if (e instanceof BadRequestError) console.log(e);
    } finally {
      this.props.setIsLoading(false);
    }
  };

  onChange = params => {
    const url = this.props.location.pathname + this.serialize(params);
    this.makeRequest(params);
    this.props.history.replace(url);
  };

  serialize = obj => {
    const str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return "?" + str.join("&");
  };

  render() {
    return (
      <ResponsiveList
        {...this.props}
        {...this.state}
        onChange={this.onChange}
      />
    );
  }
}

export default withRouter(PageWithList);
