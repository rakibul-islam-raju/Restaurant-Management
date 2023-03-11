import { AuthContext } from "@/contexts/AuthContext";
import orderService from "@/services/orderService";
import { PAGINATION_LIMIT } from "@/utils/config";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { ErrorMessage, WarningMessage } from "../Messages";
import Pagination from "../Pagination";
import Buttton from "../utils/Button";

const COLUMNS = [
	"",
	"Order ID",
	"Date",
	"Price",
	"Tax",
	"Total",
	"Paid",
	"Served",
	"Actions",
];

export default function OrderTable() {
	const { user } = useContext(AuthContext);

	const [orders, setOrders] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState(1);
	const [params, setParams] = useState({ limit: PAGINATION_LIMIT, offset: 0 });

	const fetchOrders = async (email, params) => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await orderService.getOrders(email, params);
			setOrders(res);
		} catch (err) {
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	const handlePayment = async (id) => {
		try {
			setLoading(true);
			setErrorMessage(null);
			await orderService.makePayment(id);
			toast.success("Payment Successfull");

			// fetch orders
			fetchOrders(user.email, params);
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
			fetchOrders(user.email, params);
		}
	}, [user, params]);

	return loading ? (
		<Loader />
	) : errorMessage ? (
		<ErrorMessage text={errorMessage} />
	) : orders?.results?.length < 1 ? (
		<WarningMessage text={"No Data Found!"} />
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
					{orders?.results?.map((item, i) => (
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
									Order ID
								</span>
								{item?.order_id}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Date
								</span>
								{new Date(item.created_at).toLocaleString()}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Price
								</span>
								{item?.total_price}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Tax
								</span>
								{item?.tax}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Total
								</span>
								{Number(item?.total_price) + Number(item?.tax)}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Paid
								</span>
								{item?.is_paid ? "Yes" : "No"}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold">
									Served
								</span>
								{item?.is_served ? "Yes" : "No"}
							</td>
							<td className="order-table-td">
								<span className="inline-block w-1/3 md:hidden font-bold"></span>
								<div className="flex justify-end md:justify-start gap-2">
									<Link href={`/order/${item?.id}`}>
										<Buttton text="View" />
									</Link>
									{!item?.is_paid && (
										<Buttton
											text="Pay"
											onClickHandler={() => handlePayment(item.id)}
										/>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				count={orders?.count}
				currentPage={page}
				onChange={onPageChange}
				totalPages={Math.ceil(orders?.count / params.limit)}
				next={orders?.next}
				previous={orders?.previous}
			/>
		</>
	);
}
