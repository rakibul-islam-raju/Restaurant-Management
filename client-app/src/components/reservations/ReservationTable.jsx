const COLUMNS = ["", "Name", "Phone", "Date", "Time", "Status"];

export default function ReservationTable({ reservations }) {
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
	);
}
