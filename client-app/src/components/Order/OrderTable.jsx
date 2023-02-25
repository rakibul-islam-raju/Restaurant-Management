import Link from "next/link";
import Buttton from "../utils/Button";

const COLUMNS = [
	"",
	"Date",
	"Price",
	"Tax",
	"Total",
	"Paid",
	"Served",
	"Actions",
];

export default function OrderTable({ orders }) {
	return (
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
							{item?.id_paid ? "Yes" : "No"}
						</td>
						<td className="order-table-td">
							<span className="inline-block w-1/3 md:hidden font-bold">
								Served
							</span>
							{item?.id_served ? "Yes" : "No"}
						</td>
						<td className="order-table-td">
							<span className="inline-block w-1/3 md:hidden font-bold"></span>
							<div className="flex justify-end md:justify-start gap-2">
								<Link href={`/order/${item?.id}`}>
									<Buttton text="View" />
								</Link>
								{!item?.id_paid && <Buttton text="Pay" />}
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
