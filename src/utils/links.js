import { IoBarChartSharp } from 'react-icons/io5';
import { MdEngineering } from 'react-icons/md';
import { GiFactory } from 'react-icons/gi';
import { AiOutlineProfile } from 'react-icons/ai';

const links = [
	{
		id: 1,
		path: '/',
		text: 'stats',
		icon: <IoBarChartSharp />,
	},
	{
		id: 2,
		path: '/all-jobs',
		text: 'All Jobs',
		icon: <GiFactory />,
	},
	{
		id: 3,
		path: '/add-job',
		text: 'Add Job',
		icon: <MdEngineering />,
	},
	{
		id: 4,
		path: '/profile',
		text: 'Profile',
		icon: <AiOutlineProfile />,
	},
];

export default links;
