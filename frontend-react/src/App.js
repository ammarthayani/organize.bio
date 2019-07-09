import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Header from './components/layout/Header';
import AddUser from './components/AddUser';
import About from './components/pages/About';
import axios from 'axios';

class App extends React.Component {
	state = {
		users : []
	};

	componentDidMount () {
		axios.get('https://jsonplaceholder.typicode.com/users').then((res) => this.setState({ users: res.data }));
	}

	markComplete = (id) => {
		this.setState({
			users : this.state.users.map((user) => {
				if (user.id === id) {
					user.admin = !user.admin;
				}
				return user;
			})
		});
	};

	delUser = (id) => {
		axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
		.then(res =>
			this.setState({
				users : [
					...this.state.users.filter((user) => user.id !== id)
				]
			})
		);
	};

	addUser = (name) => {
		axios
			.post('https://jsonplaceholder.typicode.com/users', {
				name
			})
			.then((res) =>
				this.setState({
					users : [
						...this.state.users,
						res.data
					]
				})
			);
	};

	render () {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route
						exact
						path="/"
						render={(props) => (
							<React.Fragment>
								<AddUser addUser={this.addUser} />
								<Users
									users={this.state.users}
									markComplete={this.markComplete}
									delUser={this.delUser}
								/>
							</React.Fragment>
						)}
					/>
					<Route path="/about" component={About} />
				</div>
			</Router>
		);
	}
}

export default App;
