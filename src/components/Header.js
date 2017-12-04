import React,{Component} from 'react';

import TodoTextInput from 'components/TodoTextInput';


class Header extends Component{
	constructor(props){
		super(props);
	}
	handleSave(text){
		console.log(this.props);
		if(text.length!=0){
			this.props.addTodo(text);
		}
	}
	render(){
		return(
			<header className='header'>
				<h1>todos</h1>
				<TodoTextInput 
				newTodo
				onSave={this.handleSave.bind(this)}
				placeholder='What needs to be done?'
				/>
			</header>
		)
	}
}

export default Header;










