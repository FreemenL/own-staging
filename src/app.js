import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import Routes from 'router/router';
import CommonStore from 'libs/CommonStore';
import { AppContainer } from 'react-hot-loader';
process.env.NODE_ENV=='development'&& require('mock/mockData.js');

require('normalize.css');
// import 'antd-mobile/dist/antd-mobile.less';

const store = createStore(reducer);

const App = {
  run:function(){   
   	render(
      <Provider store={store}>
        <Routes />
      </Provider>, 
      document.getElementById('root')
    )
  }
}
CommonStore.getWxSign(function(data){
	jssdk.config(data);
	CommonStore.wxLogin(function(data){
		App.run();
	});
})
