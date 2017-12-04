
import React,{Component} from 'react';

import Scroller from 'silk-scroller';

import data from 'mock/component.list.view.json';

require('style/sass/basic.scss')

const ajax = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

class Example extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          lists:[]
        };
        this.index = 1;
        this.fetchData = this.fetchData.bind(this);
        this.pullRefreshAction = this.pullRefreshAction.bind(this);
        this.loadMoreAction = this.loadMoreAction.bind(this);
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount() {
        this.fetchData('refresh');
    }
    /**
     * 获取列表内容
     * */
    getContent() {
        this.index=1;
        return this.state.lists.map(
          list => <li key={`list${this.index}`} className="list-view-item">{`${this.index++}. ${list}`}</li>
        )
    }
    /**
     * 获取数据
     * */
    fetchData(type, resolve, reject) {
        ajax().then(data => {
            if (resolve) {
                resolve();
            }
            const lists = data.value.list;
            this.setState({
                lists: type === 'refresh' ? lists : this.state.lists.concat(lists)
            });
        }).catch(() => {
            if (reject) {
                reject();
            }
        });
    }
    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject){
        this.index = 1;
        this.fetchData('refresh', resolve, reject);
    }
    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
      this.fetchData('load', resolve, reject);
    }

    render() {
        return (
            <div>
                <Scroller
                    usePullRefresh
                    pullRefreshAction={this.pullRefreshAction}
                    useLoadMore
                    loadMoreAction={this.loadMoreAction}
                    >
                    <ul>{this.getContent()}</ul>
                </Scroller> 
            </div>
            
        )
    }
}


export default Example;