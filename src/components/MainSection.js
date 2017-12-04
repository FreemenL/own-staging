import React ,{ Component } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from 'constants/TodoFilters';

const TODO_FILTERS = {
	[SHOW_ALL]:()=>true,
	[SHOW_ACTIVE]:todo => !todo.completed,
	[SHOW_COMPLETED]:todo => todo.completed
}

export default class MainSection extends Component{
	constructor(props){
		super(props);
		this.state = {
			filter:SHOW_ALL
		}
	}
	handleClearCompleted(){
    this.props.actions.clearCompleted()
  }
  handleShow(filter){
    this.setState({ filter })
  }
	renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }
	renderToggleAll(completedCount){
		const{todos,actions} = this.props;
		if(todos.length>0){
			return(
				<span>
					<input 
						className="toggle-all"
						type="checkbox"
						checked={completedCount === todos.length}
						type="checkbox"/>
					<label onClick={actions.completeAll}></label>
				</span>
			)
		}
	}
	render(){
		const { todos , actions } = this.props;
		const { filter } = this.state;
		const filteredTodos = todos.filter(TODO_FILTERS[filter]);
		const completedCount = todos.reduce((count,todo)=>todo.completed?count+1:count,0);
		return(
			<section className="main">
				{this.renderToggleAll(completedCount)}
				<ul className='todo-list'>
					{filteredTodos.map(todo=>
						<TodoItem key={todo.id} todo={todo} {...actions}/>
					)}
				</ul>
				{this.renderFooter(completedCount)}
			</section>
		)
	}
}