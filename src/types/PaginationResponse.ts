/**
 * Representation of the response expected from the paginator.
 */
interface PaginationResponse<T> {
  /**
   * The array of items within the section selected by the page size and page number
   */
  items: Array<T>
  /**
   * Meta data around the selection of the response
   */
  meta: {
    /**
     * Indication of whether or not more records exist on the next page
     */
    hasMore: boolean
    /**
     * Indication of the current number of items contained on a page
     */
    pageSize: number
    /**
     * Indication of the current end index (excluding) the array will be split to
     */
    endIndex: number
    /**
     * Indication of the current page the selection is taking place from
     */
    pageNumber: number
    /**
     * Indication of the current start index (including) the array will be split from
     */
    startIndex: number
    /**
     * Indication of the total number of pages that the paginator has split the array into
     */
    totalPages: number
  }
}

export { PaginationResponse }
