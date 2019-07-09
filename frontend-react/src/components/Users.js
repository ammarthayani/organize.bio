import React from 'react';
import User from './User';
import PropTypes from 'prop-types';

class Users extends React.Component {
		markComplete = (e) => {
			console.log('hello')
		}

		render() {
			return this.props.users.map((user) => < User key = {
					user.id
				}
				user = {
					user
				}
				markComplete = {
					this.props.markComplete
				}
				delUser ={
					this.props.delUser
				}
				/>);
			}
		}

		Users.propTypes = {
			users: PropTypes.array.isRequired,
			markComplete: PropTypes.func.isRequired,
			delUser: PropTypes.func.isRequired

		};

		export default Users;