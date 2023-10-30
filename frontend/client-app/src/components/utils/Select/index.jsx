const Select = ({ forId, labelText }) => {
	return (
		<div>
			<label
				htmlFor={forId}
				className="block text-lg leading-loose font-semibold text-gray-600"
			>
				{labelText}
			</label>
			<select
				id={forId}
				className="px-4 py-2.5  border border-gray-300 text-gray-900 text-base  focus:border-black block w-full transition"
			>
				<option>Select</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
			</select>
		</div>
	);
};

export default Select;
