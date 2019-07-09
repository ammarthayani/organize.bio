import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
	getStyle = () => {
		return {
			background     : '#f4f4f4',
			padding        : '10px',
			borderBottom   : '1px #ccc dotted',
			textDecoration : this.props.user.admin ? 'none' : 'line-through'
		};
	};

	markComplete = (e) => {
		console.log(this.props);
	};

	render () {
		const { id, name } = this.props.user;
		return (
			<div style={this.getStyle()}>
				<p>
					<input type="checkbox" onChange={this.props.markComplete.bind(this, id)} />
					{name}
					<button style={btnStyle} onClick={this.props.delUser.bind(this, id)}>
						x
					</button>
				</p>
			</div>
		);
	}
}

User.propTypes = {
	user         : PropTypes.object.isRequired,
	markComplete : PropTypes.func.isRequired,
	delUser      : PropTypes.func.isRequired
};

const btnStyle = {
	background   : '#ff0000',
	color        : '#fff',
	border       : 'none',
	padding      : '5px 9px',
	borderRadius : '50%',
	cursor       : 'pointer',
	float        : 'right'
};

export default User;
