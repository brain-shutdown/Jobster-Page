import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignJustify, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { Logo } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, logoutUser } from '../features/user/userSlice';
import useOutsideClick from '../hooks/useOutsideClick';

const Navbar = () => {
	const [dropdownToggled, setDropdownToggled] = useState(false);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	function closeDropdown() {
		setDropdownToggled(false);
	}
	const ref = useOutsideClick(closeDropdown);

	return (
		<Wrapper>
			<div className='nav-center'>
				<button
					type='button'
					className='toggle-btn'
					onClick={() => dispatch(toggleSidebar())}>
					<FaAlignJustify />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>Dashboard</h3>
				</div>
				<div className='btn-container'>
					<button
						ref={ref}
						type='button'
						className='btn'
						onClick={() => setDropdownToggled(!dropdownToggled)}>
						<FaUserCircle />
						{user.name.toUpperCase()}
						<FaCaretDown />
					</button>
					<div className={dropdownToggled ? 'show-dropdown dropdown' : 'dropdown'}>
						<button
							type='button'
							className='dropdown-btn'
							onClick={() => dispatch(logoutUser('Logging out...'))}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;
