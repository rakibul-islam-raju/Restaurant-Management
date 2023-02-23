export default function Modal({ children, title, handleClose }) {
	return (
		<div
			className="relative z-30 cursor-not-allowed"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			{/* overlay */}
			<div className="fixed inset-0 z-30 bg-gray-700 bg-opacity-20 transition-opacity"></div>
			<div className="fixed inset-0 z-40 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 cursor-auto">
							{/* modal header */}
							<div
								className={`flex ${
									title ? "justify-between" : "justify-end"
								} items-center mb-2`}
							>
								<h4 className="grow">{title}</h4>
								<button
									type="button"
									onClick={handleClose}
									className="hover:text-black transition"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
							</div>

							{/* modal content */}
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
