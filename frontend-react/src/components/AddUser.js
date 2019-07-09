import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddUser extends Component {
	state = {
		name : ''
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addUser(this.state.name);
		this.setState({ name: '' });
	};

	render () {
		return (
			<form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
				<input
					type="text"
					name="name"
					placeholder="Add User ..."
					style={{ flex: '10', padding: '5px' }}
					value={this.state.name}
					onChange={this.onChange}
				/>
				<input type="submit" value="Submit" className="btn" style={{ flex: '1' }} />
			</form>
		);
	}
}

AddUser.propTypes = {
	addUser : PropTypes.func.isRequired
};

export default AddUser;
