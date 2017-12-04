import React,{Component} from 'react';
import { Button } from 'antd-mobile';

var img1 = require('images/1.jpg');
require('style/demo.less');
class Demo extends Component{
	constructor(props){
		super(props);
		var address = 'http://www.52mlsz.com/';
		$.ajax({
			url:address+'test',
			type:'post',
			success:function(data){
				console.log(data);
			},
			error:function(err){
				console.log(err);
			}
		})
	}
	handleSave(text){
		const {history} = this.props;
		history.push('/footer/1');
	}
	render(){
		return(
			<header className='demo'>
				<h1 onClick={this.handleSave.bind(this)}>todos</h1>
				<img src={img1} width="100%"/>
				<Button>Start</Button>
				<div className='test'></div>
			</header>
		)
	}
}

export default Demo;










