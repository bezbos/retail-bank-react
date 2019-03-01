import "bootstrap/dist/css/bootstrap.css";
import React, {Component} from 'react';
import './App.css';
import Banks from "./components/banks";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <main className="container">
                    <Banks/>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
