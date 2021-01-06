import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ErrorBoundary from "./components/ErrorBoundary";
import { ConfigureStore } from "./store/configureStore";
import Main from "./components/MainComponent";



const store = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <ErrorBoundary>
              <Main />
            </ErrorBoundary>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
