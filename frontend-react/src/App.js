import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import User from './components/User';
import Login from './components/login/Login';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import About from './components/pages/About';

const useStyles = makeStyles((theme) => ({
	root       : {
		flexGrow : 1
	},
	menuButton : {
		marginRight : theme.spacing(2)
	},
	title      : {
		flexGrow : 1
	}
}));

const client = new ApolloClient({
	uri : 'http://localhost:4000/graphql'
});

const GET_USERS = gql`
	query users {
		institutions {
			id
			name
			users {
				name
			}
		}
	}
`;

function TodoForm ({ addTodo }) {
	const [
		value,
		setValue
	] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="Add Todo ..."
				type="text"
				className="input"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
}

function App () {
	const [
		users,
		setTodos
	] = useState([
		{
			text        : 'Learn about Hooks',
			isCompleted : false
		},
		{
			text        : 'meet friend',
			isCompleted : false
		},
		{
			text        : 'build dtabse app',
			isCompleted : false
		}
	]);

	const classes = useStyles();

	const [
		signin,
		setSignin
	] = useState(false);

	const switchSignin = () => {
		const newsignin = !signin;
		setSignin(newsignin);
	};

	return (
		<ApolloProvider client={client}>
			<Router>
				<Route
					exact
					path="/"
					render={() => (
						<div className="app">
							<AppBar position="static">
								<Toolbar>
									<IconButton
										edge="start"
										className={classes.menuButton}
										color="inherit"
										aria-label="Menu"
									>
										<MenuIcon />
									</IconButton>
									<Typography variant="h6" className={classes.title}>
										Users
									</Typography>
									<Button color="inherit">Login</Button>
								</Toolbar>
							</AppBar>
							<Query query={GET_USERS}>
								{({ loading, error, data }) => {
									if (loading) return <p>Loading...</p>;
									if (error) return <p>Error</p>;

									return data.institutions.map(({ users, name, id }) => (
										<div key={id}>
											<Typography variant="h4">{name}</Typography>
											<User users={users} />
										</div>
									));
								}}
							</Query>
						</div>
					)}
				/>
				<Route path="/login" render={() => <Login signin={signin} switchSignin={switchSignin} />} />
				<Route path="/about" component={About} />
			</Router>
		</ApolloProvider>
	);
}

export default App;
