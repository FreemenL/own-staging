import React,{ Component } from 'react';
import classnames from 'classnames';
class TodoTextInput extends Component{
	constructor(props){
		super(props);
		this.state={
			text:this.props.text||''
		}
	}
	handleChange(text,event){
		this.setState({
			[text]:event.target.value.trim()
		})
	}
	handleSubmit(event){
		if(event.which===13){
			this.props.onSave(this.state.text);
			if(this.props.newTodo){
				this.setState({
					text:''
				})
			}
		}
	}
	handleBlur(e){
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }
	render(){
		return(
			<input 
				className={
					classnames({
						edit:this.props.editing,
						'new-todo':this.props.newTodo
					})
				}
				type="text"
				value={this.state.text}
				autoFocus="true"
				onBlur={this.handleBlur.bind(this)}
				placeholder={this.props.placeholder}
				onChange={this.handleChange.bind(this,'text')}
				onKeyDown={this.handleSubmit.bind(this)}
			/>
		)
	}
}

export default TodoTextInput;