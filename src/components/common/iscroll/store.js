import Reflux from 'reflux';
import actions from './actions';
import Mixins from 'libs/CommonStore';

export default Reflux.createStore({
    mixins:[Mixins],
    listenables:[actions],
    onGetMsg(options){
    	var _this = this;
    	let subData;
    	if(options.options){
    		subData=options.options;
    	}else{
    		subData=options;
    	}
	    this.ajaxPost('street/healthIndex',subData,function(result) {
	    		let resultData = result.data;
	    		if(options.resolve){
	    			resultData.resolve=options.resolve;
	    		}
	    		_this.trigger('list',resultData);
	    });
    }
})
