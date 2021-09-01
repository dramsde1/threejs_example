import ReactDOM from 'react-dom';
import './index.css';
import React, { Component } from 'react';
import Location from './containers/Location';


class Index extends Component {


  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        {<Location />}
      </div>
    );

  }
}


ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
