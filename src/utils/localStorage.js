export const addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};
export const removeUserToLocalStorage = () => {
	localStorage.removeItem('user');
};
export const getUserToLocalStorage = () => {
	let user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
};
