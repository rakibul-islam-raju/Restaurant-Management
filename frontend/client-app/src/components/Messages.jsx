export function SuccessMessage({ text }) {
	return (
		<div className="bg-green-100 text-green-500 font-semibold p-2 rounded border border-green-500 my-2">
			{text}
		</div>
	);
}

export function ErrorMessage({ text }) {
	return (
		<div className="bg-red-100 text-red-500 font-semibold p-2 rounded border border-red-500 my-2">
			{text}
		</div>
	);
}

export function WarningMessage({ text }) {
	return (
		<div className="bg-yellow-100 text-yellow-500 font-semibold p-2 rounded border border-yellow-500 my-2">
			{text}
		</div>
	);
}

export function InfoMessage({ text }) {
	return (
		<div className="bg-golden text-white font-semibold p-2 rounded border border-golden my-2">
			{text}
		</div>
	);
}
