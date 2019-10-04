import React from "react";

class App extends React.Component {
  state = {};
  async componentDidMount() {
    const resp = await fetch("http://localhost:5000/");
    const json = await resp.json();
    this.setState({ data: json.data });
    console.log(json);
  }
  render() {
    const { data } = this.state;
    return <div>{data ? <div>{data}</div> : <div>Api Offline</div>}</div>;
  }
}

export default App;
