import React from 'react';

const Loading = ({ center }) => {
	return <div className={center ? 'loading loadin-center' : 'loading'}></div>;
};

export default Loading;
