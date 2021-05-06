import React from 'react';

export default function PaginationButtons(props) {
	const { startIndex, endIndex, allPurchases, decreasePage, increasePage } = props;
	return (
		<div className="pagination-btns-container">
			{startIndex > 0 && (
				<button className="pagination-btn" onClick={() => decreasePage()}>
					Previous
				</button>
			)}
			{endIndex < allPurchases.length && (
				<button className="pagination-btn" onClick={() => increasePage()}>
					Next
				</button>
			)}
		</div>
	);
}
