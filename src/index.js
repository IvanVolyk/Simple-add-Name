import React, { Component, PureComponent, Fragment } from "react";
import { render } from "react-dom";

class App extends Component {
	state = {
		users: [
			{ id: 1, name: "Александр" },
			{ id: 2, name: "Марина" },
			{ id: 3, name: "Аня"}
		]
	};
	addTop = name => {
		this.setState(state => ({
			users: [{ id: state.users.length + 1, name }, ...state.users]
		}));
	};

	addBottom = name => {
		this.setState(state => ({
			users: [...state.users, { id: state.users.length + 1, name }]
		}));
	};
	
	render() {
		return (
			<Fragment>
				<Users names={this.state.users}/>
				<AddName addTop={this.addTop} addBottom={this.addBottom}/>
			</Fragment>
			);
	}
}

class AddName extends PureComponent {
	getInput = el => {
		this.input = el;
	};
	addToTop = () => {
		if (!this.input.value.trim()) {
			return;
		}
		this.props.addTop(this.input.value);
		this.input.value = "";
	};

	addToBottom = () => {
		if (!this.input.value.trim()) {
			return;
		}
		this.props.addBottom(this.input.value);
		this.input.value = "";
	};
	
	render() {
		return(
			<Fragment>
				<input ref={this.getInput} />
				<button onClick={this.addToTop}>Add to TOP</button>
				<button onClick={this.addToBottom}>Add to BOTTOM</button>
				
			</Fragment>
		);
	}
}

class Users extends PureComponent {
	render() {
		return(
			<ul>
				{this.props.names.map(user => <Name key={user.id}>{user.name}</Name>)}
			</ul>
		);
	}
}

class Name extends PureComponent {
	componentDidMount() {
		console.log('Mounted with ${this.props.children}');
	}
	componentDidUpdate(prevProps) {
		console.log('Update from ${prevProps.children} to ${this.props.children}');
	}
	render() {
		return <li>{this.props.children}</li>
	}
}

render(<App />, document.getElementById("root"));