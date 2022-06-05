export const addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user');
};
export const getUserFromLocalStorage = () => {
	let user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
};
