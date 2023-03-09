function Buttton({
	width,
	text = "button",
	type = "button",
	onClickHandler,
	disabled = false,
	...rest
}) {
	return (
		<button
			type={type}
			onClick={onClickHandler}
			className={`py-3 px-3 ${width}  text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300 ${
				disabled ? "cursor-not-allowed" : "cursor-pointer"
			}`}
			disabled={disabled}
			{...rest}
		>
			{text}
		</button>
	);
}

export default Buttton;
