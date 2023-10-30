import { AuthContext } from "@/contexts/AuthContext";
import reviewService from "@/services/reviewService";
import { PAGINATION_LIMIT } from "@/utils/config";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import { ErrorMessage, WarningMessage } from "../Messages";
import Modal from "../Modal";
import Pagination from "../Pagination";
import Buttton from "../utils/Button";
import ReviewForm from "./ReviewForm";

const COLUMNS = ["", "Menu", "Category", "Rating", "Comment", "Date", "Action"];

export default function ReviewsTable() {
	const { user } = useContext(AuthContext);

	const [reviews, setReviews] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [editReview, setEditReview] = useState(null);
	const [page, setPage] = useState(1);
	const [params, setParams] = useState({ limit: PAGINATION_LIMIT, offset: 0 });

	const fetchReviews = async (email, params) => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await reviewService.getReviewsByUser(email, params);
			setReviews(res);
		} catch (err) {
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	const onPageChange = (p) => {
		setPage(p);
		const newOffset = (p - 1) * params.limit;
		setParams({ ...params, offset: newOffset });
	};

	useEffect(() => {
		if (user?.email) {
			fetchReviews(user.email, params);
		}
	}, [user, params]);

	return loading ? (
		<Loader />
	) : errorMessage ? (
		<ErrorMessage text={errorMessage} />
	) : reviews?.results?.length < 1 ? (
		<WarningMessage text="No Data Found!" />
	) : (
		<>
			<table className="min-w-full border-collapse block md:table">
				<thead className="block md:table-header-group">
					<tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
						{COLUMNS.map((item) => (
							<th
								key={item}
								className="bg-golden p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"
							>
								{item}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="block md:table-row-group">
					{reviews?.results?.map((item, i) => (
						<tr
							key={item.id}
							className="bg-gray-100 border border-gray-500 md:border-none block md:table-row"
						>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold"></span>
								{i + 1}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Menu
								</span>

								{item?.menu?.name}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Phone
								</span>
								{item?.menu?.category?.name}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Rating
								</span>
								{item?.rating} Star
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Rating
								</span>
								{item?.comment}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Date
								</span>
								{new Date(item?.created_at).toLocaleString()}
							</td>
							<td className="order-table-td">
								<Buttton
									text="Edit"
									onClickHandler={() => setEditReview(item)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Pagination
				count={reviews?.count}
				currentPage={page}
				onChange={onPageChange}
				totalPages={Math.ceil(reviews?.count / params.limit)}
				next={reviews?.next}
				previous={reviews?.previous}
			/>

			{/* review edit modal */}
			{editReview && (
				<Modal handleClose={() => setEditReview(null)}>
					<ReviewForm
						item={editReview}
						editData={editReview}
						handleClose={() => setEditReview(null)}
					/>
				</Modal>
			)}
		</>
	);
}
