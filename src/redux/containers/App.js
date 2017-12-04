import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/Header';
import MainSection from 'components/MainSection';
import * as TodoActions from 'actions';


class  App extends Component{
	constructor(props){
	    super(props);

	}
	jump(){
		const {history} = this.props;
		history.push('dist');
	}
	render(){
		let {actions,todos} = this.props;
		return(
			<div>
				<Header addTodo={actions.addTodo}/>
				<MainSection todos={todos} actions={actions}/>
				<button onClick={this.jump.bind(this)}>asjd</button>
			</div>
		)
	}
}

const mapStateToProps = state =>({
	todos:state.todos
})

const mapDispatchToProps = dispatch=>({
	actions:bindActionCreators(TodoActions,dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)