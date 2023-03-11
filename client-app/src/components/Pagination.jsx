import _ from "lodash";

export default function Pagination({
	count,
	currentPage,
	onChange,
	totalPages,
	next,
	previous,
}) {
	return (
		<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div class="flex flex-1 justify-between sm:hidden">
				<button
					disabled={!previous}
					onClick={() => onChange(currentPage - 1)}
					type="button"
					class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Previous
				</button>

				<button
					disabled={!next}
					onClick={() => onChange(currentPage + 1)}
					type="button"
					class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Next
				</button>
			</div>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div></div>
				<div>
					<nav
						class="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<button
							disabled={!previous}
							onClick={() => onChange(currentPage - 1)}
							type="button"
							class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border"
						>
							<span class="sr-only">Previous</span>
							<svg
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						{_.range(1, Number(totalPages) + 1).map((i) => {
							return (
								<button
									disabled={currentPage === i}
									onClick={() => onChange(i)}
									type="button"
									aria-current="page"
									class={`relative z-10 inline-flex border items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
										currentPage === i ? "bg-golden text-white" : "text-golden"
									}`}
								>
									{i}
								</button>
							);
						})}

						<button
							disabled={!next}
							onClick={() => onChange(currentPage + 1)}
							type="button"
							class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 border"
						>
							<span class="sr-only">Next</span>
							<svg
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
}
