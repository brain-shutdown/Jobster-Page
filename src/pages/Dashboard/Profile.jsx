import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow } from '../../components';
import { updateUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
	const {
		user: { email, location, name, lastName },
	} = useSelector((store) => store.user);
	const [userData, setUserData] = React.useState({
		email,
		name,
		lastName,
		location,
	});
	const dispatch = useDispatch();

	function handleChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		if (name in userData) {
			setUserData({ ...userData, [name]: value });
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		const { name, lastName, email, location } = userData;
		if (!name || !lastName || !email || !location) {
			toast.error('Please fill all fields!');
			return;
		}
		dispatch(updateUser(userData));
	}

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>Profile</h3>
				<div className='form-center'>
					<FormRow
						type='text'
						name='name'
						value={userData.name}
						handleChange={handleChange}
						autocomplete='name'
					/>
					<FormRow
						type='text'
						name='lastName'
						value={userData.lastName}
						handleChange={handleChange}
						autocomplete='name'
						labelText='Last Name'
					/>
					<FormRow
						type='email'
						name='email'
						value={userData.email}
						handleChange={handleChange}
						autocomplete='username'
					/>
					<FormRow
						type='text'
						name='location'
						value={userData.location}
						handleChange={handleChange}
					/>
					<button type='submit' className='btn btn-block'>
						Save Changes
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default Profile;
