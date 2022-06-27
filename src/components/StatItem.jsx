import Wrapper from '../assets/wrappers/StatItem';

const StatItem = ({ title, count, bcg, icon, color }) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className='count'>{count}</span>
				<span className='icon'>{icon}</span>
			</header>
			<h5 className='title'>{title}</h5>
		</Wrapper>
	);
};

export default StatItem;
