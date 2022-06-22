import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { setCurrentPage } from '../features/job/allJobsSlice';

const PageBtnContainer = () => {
	const { numPages, page } = useSelector((store) => store.allJobs);
	const dispatch = useDispatch();

	const pages = Array.from({ length: numPages }, (_, index) => {
		return index + 1;
	});

	const nextPage = () => {
		let next = page + 1;
		if (next > numPages) next = 1;
		dispatch(setCurrentPage(next));
	};
	const prevPage = () => {
		let prev = page - 1;
		if (prev < 1) prev = numPages;
		dispatch(setCurrentPage(prev));
	};

	return (
		<Wrapper>
			<button type='button' className='prev-btn' onClick={prevPage}>
				<HiChevronDoubleLeft />
				Prev
			</button>
			<div className='btn-container'>
				{pages.map((num) => {
					return (
						<button
							key={num}
							type='button'
							className={num === page ? 'pageBtn active' : 'pageBtn'}
							onClick={() => dispatch(setCurrentPage(num))}>
							{num}
						</button>
					);
				})}
			</div>
			<button type='button' className='next-btn' onClick={nextPage}>
				Next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
};

export default PageBtnContainer;
