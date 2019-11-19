import React from 'react';

// import drizzle functions and contract artifact
import { Drizzle } from "drizzle";
import { DrizzleProvider } from "drizzle-react"

import LoadingContainer from "./loadingContainer"
import drizzleOptions from "./drizzleOptions"
import store from "./middleware"

export default class App extends React.Component {
  render() {
    return (
      <DrizzleProvider store={store} options={drizzleOptions}>
        <LoadingContainer>
          <p> AAAAAAA </p>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}
