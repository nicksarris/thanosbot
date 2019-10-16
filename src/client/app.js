/*
 *
 * App Component
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

/* Components Used */
import Index from './containers/Index/index';
/* Components Used */

import 'font-awesome/css/font-awesome.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter basename="/">
      <div>
        <Helmet titleTemplate="%s - ThanosBot" defaultTitle="ThanosBot">
          <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" />
          <meta name="description" content="Perfectly Balancing GroupMe Groups" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/index" component={Index} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
