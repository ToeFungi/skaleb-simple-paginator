import { Paginator } from './types/Paginator'
import { PaginationResponse } from './types/PaginationResponse'

/**
 * SimplePaginator paginates a given array with the criteria provided. Setting the page size, page number and returning
 * the subset of the array
 */
class SimplePaginator<T> implements Paginator<T> {
  /**
   * The array to be paginated
   */
  private arr: Array<T>

  /**
   * Default ending index. This is the index that the array will be sliced at
   */
  private endIndex: number

  /**
   * Default starting index. This is the index that the array will will start from
   */
  private startIndex: number

  /**
   * This is the number of items that will be returned in the array set
   */
  private pageSize: number

  /**
   * This is the page number indicating the section of the array that should be selected
   */
  private pageNumber: number

  /**
   * This is the number of pages the paginator will break the array into given the current setup
   */
  private totalPages: number

  /**
   * Instantiates a new Paginator.
   */
  constructor(arr: Array<T> = [], pageNumber: number = 1, pageSize: number = 10) {
    this.arr = arr
    this.endIndex = 0
    this.startIndex = 0
    this.totalPages = 0

    this.pageSize = pageSize
    this.pageNumber = pageNumber
  }

  /**
   * @inheritDoc
   */
  public setArray(arr: Array<T>): this {
    this.arr = arr
    return this
  }

  /**
   * @inheritDoc
   */
  public getPage(): PaginationResponse<T> {
    // Assign start and end indexes
    this.endIndex = this.pageNumber * this.pageSize
    this.startIndex = (this.pageNumber - 1) * this.pageSize

    // Get page from the array
    const items = this.arr.slice(this.startIndex, this.endIndex)

    // Determine if more records are available
    const hasMore = !(items.length !== this.pageSize || this.arr.length === this.endIndex)

    // Format response
    return {
      items,
      meta: {
        hasMore,
        pageSize: this.pageSize,
        endIndex: this.endIndex,
        pageNumber: this.pageNumber,
        startIndex: this.startIndex,
        totalPages: this.totalPages
      }
    }
  }

  /**
   * @inheritDoc
   */
  public incrementPage(): this {
    this.pageNumber++
    return this
  }

  /**
   * @inheritDoc
   */
  public decrementPage(): this {
    if (this.pageNumber === 1) {
      return this
    }

    this.pageNumber--
    return this
  }

  /**
   * @inheritDoc
   */
  public setPageNumber(pageNumber: number): this {
    if (pageNumber < 1) {
      this.pageNumber = 1
      return this
    }

    this.pageNumber = pageNumber
    return this
  }

  /**
   * @inheritDoc
   */
  public setPageSize(pageSize: number): this {
    if (pageSize < 1) {
      this.pageSize = 1
      return this
    }

    this.pageSize = pageSize
    return this
  }

  /**
   * @inheritDoc
   */
  public getTotalPages(): number {
    return this.totalPages
  }
}

export { SimplePaginator }
