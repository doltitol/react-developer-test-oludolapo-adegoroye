import React, { PureComponent } from 'react';
import Pages from './pages';


class App extends PureComponent {
  render() {
    return (
      <div data-testid='app-component'>
        <Pages />
      </div>
    );
  }
}
export default App;
