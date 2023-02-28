function TextArea({
	forId,
	labelText,
	type = "text",
	placeholder = "",
	error = false,
	helperText = "",
	register,
	name = "",
	rows = 3,
	...rest
}) {
	return (
		<div className="pb-5">
			<label
				htmlFor={forId}
				className="block text-lg leading-loose font-semibold text-gray-600"
			>
				{labelText}
			</label>

			<textarea
				rows={rows}
				type={`${type}`}
				id={`${forId}`}
				placeholder={`${placeholder}`}
				className={`px-4 py-2.5  border ${
					error ? "border-red-500" : "border-gray-300"
				} text-gray-900 text-base  focus:border-black block w-full transition`}
				{...(register && register(name))}
				{...rest}
			/>

			{helperText && (
				<p className={`text-sm pt-1 ${error && "text-red-500"}`}>
					{helperText}
				</p>
			)}
		</div>
	);
}

export default TextArea;
