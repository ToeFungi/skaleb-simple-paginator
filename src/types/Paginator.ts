import { PaginationResponse } from './PaginationResponse'

/**
 * Paginator represents the public interface for the SimplePaginator
 */
interface Paginator<T> {
	/**
	 * Sets the array on which the pagination will take place
	 */
	setArray(arr: Array<T>): Paginator<T>

	/**
	 * Returns a section of the paginated array
	 */
	getPage(): PaginationResponse<T>

	/**
	 * Increase the page number by one.
	 */
	incrementPage(): Paginator<T>

	/**
	 * Decrease the page number by one. If the page value is 1, the page number will not decrement
	 */
	decrementPage(): Paginator<T>

	/**
	 * Set the page number for the paginated responses. If given value is less than 1, then the page number defaults to 1
	 */
	setPageNumber(pageNumber: number): Paginator<T>

	/**
	 * Set the number of responses returned in the paginated response. If given value is less than 1, then the page size
	 * defaults to 1
	 */
	setPageSize(pageSize: number): Paginator<T>
}

export { Paginator }
