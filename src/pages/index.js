import Home from './Home/Home';
import { PureComponent } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Categories from '../Categories.json';

class Pages extends PureComponent {
  render() {
    console.log(Categories.data.categories);
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Navigate to={`/${Categories.data.categories[0].name}`} />
              }
            />
            {Categories.data.categories.map((route) => (
              <Route
                path={`/${route.name}`}
                exact
                element={<Home category={route.name} />}
                key={route.name}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Pages;
