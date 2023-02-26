import statsService from "@/services/statsService";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { ErrorMessage } from "../Messages";

function Statistics() {
	const [loading, setLoading] = useState(false);
	const [stats, setStats] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const fetchStats = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await statsService.getStats();
			setStats(res?.results);
		} catch (err) {
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStats();
	}, []);

	return (
		<section className="wrapper">
			{loading ? (
				<Loader />
			) : errorMessage ? (
				<ErrorMessage text={errorMessage} />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
					<div className="grid grid-cols-3 gap-4 text-center items-start">
						<div>
							<strong className="stats-strong">{stats?.menus}</strong>
							<p>DISH</p>
						</div>
						<div>
							<strong className="stats-strong">{stats?.staffs}</strong>
							<p>STAFS</p>
						</div>
						<div>
							<strong className="stats-strong">
								{stats?.registered_users}
							</strong>
							<p>CUSTOMERS</p>
						</div>
					</div>
					<div className="text-center">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
							placeat ab consequatur soluta rem repudiandae sunt nulla quam
						</p>
					</div>
				</div>
			)}
		</section>
	);
}

export default Statistics;
