import useIsAuthenticated from "@/hooks/useIsAuthenticated";

export default function Order({ menu }) {
	const [isAuthenticated, user] = useIsAuthenticated();
	return <div>Order</div>;
}
