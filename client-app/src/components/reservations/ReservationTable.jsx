import { AuthContext } from "@/contexts/AuthContext";
import reservationService from "@/services/reservationService";
import { PAGINATION_LIMIT } from "@/utils/config";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import { ErrorMessage, WarningMessage } from "../Messages";
import Pagination from "../Pagination";

const COLUMNS = ["", "Name", "Phone", "Date", "Time", "Status"];

export default function ReservationTable() {
	const { user } = useContext(AuthContext);

	const [reservations, setReservations] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState(1);
	const [params, setParams] = useState({ limit: PAGINATION_LIMIT, offset: 0 });

	const fetchReservations = async (email, params) => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await reservationService.getReservations(email, params);
			setReservations(res);
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
			fetchReservations(user.email, params);
		}
	}, [user, params]);

	return loading ? (
		<Loader />
	) : errorMessage ? (
		<ErrorMessage text={errorMessage} />
	) : reservations?.results?.length < 1 ? (
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
					{reservations?.results?.map((item, i) => (
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
									Name
								</span>

								{item?.name}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Phone
								</span>
								{item?.phone}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Date
								</span>
								{new Date(item?.date).toLocaleDateString()}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Time
								</span>
								{item?.time}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Status
								</span>
								{(item?.status).toUpperCase()}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Pagination
				count={reservations?.count}
				currentPage={page}
				onChange={onPageChange}
				totalPages={Math.ceil(reservations?.count / params.limit)}
				next={reservations?.next}
				previous={reservations?.previous}
			/>
		</>
	);
}
