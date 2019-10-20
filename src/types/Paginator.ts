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
	 * Increase the page number by one
	 */
	incrementPage(): Paginator<T>

	/**
	 * Decrease the page number by one
	 */
	decrementPage(): Paginator<T>

	/**
	 * Set the page number for the paginated responses
	 */
	setPageNumber(pageNumber: number): Paginator<T>

	/**
	 * Set the number of responses returned in the paginated response
	 */
	setPageSize(pageSize: number): Paginator<T>
}

export { Paginator }
