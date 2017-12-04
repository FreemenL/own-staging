import React,{Component} from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import Store from './store';
import Actions from './actions';
import Scroller from 'silk-scroller';
import data from 'mock/component.list.view.json';

require('style/sass/basic.scss')

class Example extends React.Component{
  constructor(props) {
      super(props);
      this.index = 1;
      let initState = {
        rows:20,
        page_flag:0,
        area_id:1,
        evaluation_time:'2017-01'
      }
      this.state = Object.assign({},initState,{
        lists:[],
        noMoreData:false
      });

      Actions.getMsg(initState);
  }
  onChange(type,data){
    if(type=='list'){
      let noMoreData = false;
      if(data.list.length==0||data.list.length<this.state.rows){
        noMoreData = true;
      }
      if(this.index==1){
        this.setState({
          lists:data.list,
          page_flag:data.page_flag,
          noMoreData:noMoreData
        });
      }else{
        this.setState({
          lists:this.state.lists.concat(data.list),
          page_flag:data.page_flag,
          noMoreData:noMoreData
        });
      }
      if(data.resolve){
        data.resolve();
      }else if(data.reject){
        data.reject()
      }
    }
  }
  /**
   * 获取列表内容
   * */
  getContent() {
      this.index=1;
      return this.state.lists.map(
        list => <li key={`list${this.index}`} className="list-view-item">{`${this.index++}. ${list.street}`}</li>
      )
  }
  /**
   * 上拉加载更多动作
   * */
  subData(){
    let subData = {
      options:{
        evaluation_time:this.state.evaluation_time,
        rows:this.state.rows,
        page_flag:this.state.page_flag,
        area_id:this.state.area_id
      }
    };
    return subData;
  }
  loadMoreAction(resolve, reject) {
    let moreData = this.subData();
      if(resolve){
        moreData.resolve=resolve;
        Actions.getMsg(moreData);
      }else{
        moreData.reject=reject;
        Actions.getMsg(moreData);
      }
  }
    /**
   * 下拉刷新动作
   * */
  pullRefreshAction(resolve, reject){
      this.index = 1;
      let refData = this.subData();
      refData.options.page_flag=0;
      if(resolve){
        refData.resolve=resolve;
        Actions.getMsg(refData);
      }else{
        refData.reject=reject;
        Actions.getMsg(refData);
      }
  }
  render() {
      return (
          <div>
              <Scroller
                  noMoreData={this.state.noMoreData}
                  ref={ref => { this.scroller = ref }}
                  usePullRefresh
                  pullRefreshAction={this.pullRefreshAction.bind(this)}
                  useLoadMore
                  loadMoreAction={this.loadMoreAction.bind(this)}
                  >
                  <ul>{this.getContent()}</ul>
              </Scroller> 
          </div>
          
      )
  }
}
ReactMixin.onClass(Example,Reflux.listenTo(Store, 'onChange'));

export default Example;