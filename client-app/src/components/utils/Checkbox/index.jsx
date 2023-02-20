export default function Checkbox({ label, ...rest }) {
	return (
		<div className="pb-6">
			<label className="text-gray-600 cursor-pointer">
				<input type="checkbox" className="mr-2 cursor-pointer" {...rest} />
				{label}
			</label>
		</div>
	);
}
