import React, { Component } from 'react';
import Aux from './hoc/Auxiliary';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <BurgerBuilder />
        </Layout>  
      </Aux>
    );
  }
}

export default App;
