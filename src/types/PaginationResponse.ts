/**
 * Representation of the response expected from the paginator.
 */
interface PaginationResponse<T> {
	items: Array<T>
	meta: {
		hasMore: boolean
		pageSize: number
		endIndex: number
		pageNumber: number
		startIndex: number
	}
}

export { PaginationResponse }
