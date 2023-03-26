import { Component } from 'react';
import Preloader from './components/atoms/Preloader/Preloader';

export default class App extends Component {
  render() {
    return (
      <div>
        <Preloader />
      </div>
    )
  }
}