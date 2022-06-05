import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignJustify, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { Logo } from '../components';
import { useSelector } from 'react-redux';
import useOutsideClick from '../hooks/useOutsideClick';

const Navbar = () => {
	const [dropdownToggled, setDropdownToggled] = useState(false);
	const { user } = useSelector((store) => store.user);

	function toggleDropdown() {
		setDropdownToggled(!dropdownToggled);
	}
	const ref = useOutsideClick(toggleDropdown);

	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn'>
					<FaAlignJustify />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>Dashboard</h3>
				</div>
				<div className='btn-container'>
					<button ref={ref} type='button' className='btn' onClick={toggleDropdown}>
						<FaUserCircle />
						{user.name.toUpperCase()}
						<FaCaretDown />
					</button>
					<div className={dropdownToggled ? 'show-dropdown dropdown' : 'dropdown'}>
						<button type='button' className='dropdown-btn'>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;
