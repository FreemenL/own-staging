import React from 'react';
import {HashRouter as Router, Route, Switch ,Redirect} from 'react-router-dom'

import App from 'containers/App';
import Demo from 'components/Demo';
import BaseComponent from 'components/BaseComponent';
import ScrollComponent from 'components/common/iscroll/ScrollComponent';

// 路由配置
const routes = () => (
  <Router>
    <div className="app">
      <Route exact path="/" component={Demo} />
      <Route exact path="/base" component={BaseComponent} />
      <Route  path="/footer/:id" component={ScrollComponent}/>
      <Route path="/example" component={App} />
    </div>
  </Router>
);
 export default routes;
