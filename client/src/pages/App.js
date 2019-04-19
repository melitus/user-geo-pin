import React from "react";

import withRoot from "../Hoc/withRoot";
import Header from '../components/Header/Header'
import Map from '../components/Map/Map'

const App = () => {
  return (
    <>
      <Header />
      <Map />
    </>
  ) 
};

export default withRoot(App);
