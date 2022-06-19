import styled from 'styled-components';

const Wrapper = styled.form`
	background: var(--white);
	border-radius: var(--borderRadius);
	display: grid;
	grid-template-rows: 1fr auto;
	box-shadow: var(--shadow-2);

	header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--grey-100);
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		h5 {
			letter-spacing: 0;
		}
	}
	.main-icon {
		width: 70px;
		height: 70px;
		display: grid;
		place-items: center;
		background: var(--primary-500);
		border-radius: var(--borderRadius);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--white);
		margin-right: 1rem;
	}
	.info {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		.position {
			font-size: 1.25rem;
			margin-bottom: 0.5rem;
			text-transform: capitalize;
		}
		.company {
			margin: 0;
			color: var(--grey-400);
			letter-spacing: var(--letterSpacing);
		}
	}
	.pending {
		background: #fcefc7;
		color: #e9b949;
	}
	.interview {
		background: #e0e8f9;
		color: #647acb;
	}
	.declined {
		color: #d66a6a;
		background: #ffeeee;
	}
	.content {
		padding: 1rem 1.5rem;
	}
	.content-center {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		gap: 0.5rem;
		@media (min-width: 576px) {
			grid-template-columns: 1fr 1fr;
		}
		@media (min-width: 840px) {
			grid-template-columns: 1fr;
		}
		@media (min-width: 1120px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.media {
		display: flex;
		align-items: center;
	}

	.icon {
		font-size: 1rem;
		margin-right: 1rem;
		display: flex;
		align-items: center;
		svg {
			color: var(--grey-400);
		}
	}
	.text {
		padding: 0.35rem 1rem;
		width: 100%;
		border: none;
		border-radius: var(--borderRadius);
		background-color: var(--grey-50);
		text-transform: capitalize;
		letter-spacing: var(--letterSpacing);
		color: var(--textColor);
		height: 30px;
	}

	.text:disabled,
	.position:disabled,
	.company:disabled {
		outline: none;
		background-color: #fff;
		border: none;
		appearance: none;
		opacity: 1;
	}

	.status {
		border-radius: var(--borderRadius);
		text-transform: capitalize;
		letter-spacing: var(--letterSpacing);
		text-align: center;
		width: 125px;
		height: 35px;
	}
	.status:disabled {
		border: none;
		appearance: none;
	}

	footer {
		margin-top: 1rem;
	}
	.edit-btn,
	.delete-btn {
		letter-spacing: var(--letterSpacing);
		cursor: pointer;
		height: 30px;
	}
	.edit-btn {
		color: var(--green-dark);
		background: var(--green-light);
		margin-right: 0.5rem;
	}
	.delete-btn {
		color: var(--red-dark);
		background: var(--red-light);
	}
	&:hover .actions {
		visibility: visible;
	}
`;

export default Wrapper;
