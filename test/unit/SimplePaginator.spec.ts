import { SimplePaginator } from '../../src'

describe('SimplePaginator', () => {
  let simplePaginator: SimplePaginator<string>

  const baseMeta = {
    hasMore: false,
    pageSize: 10,
    endIndex: 10,
    pageNumber: 1,
    startIndex: 0,
    totalPages: 0
  }

  beforeEach(() => {
    simplePaginator = new SimplePaginator<string>()
  })

  describe('#constructor', () => {
    it('sets the array passed into the constructor to the classes paginated array', () => {
      const items = [ 'abc', 'def' ]

      const expectedResponse = {
        items,
        meta: {
          ...baseMeta
        }
      }

      return new SimplePaginator(items).getPage()
        .should.deep.equal(expectedResponse)
    })

    it('sets the page number passed into the constructor to the pagination`s current page', () => {
      const items = [ 'a' ]
      const pageNumber = 3

      const expectedMeta = {
        ...baseMeta,
        endIndex: 30,
        pageNumber: 3,
        startIndex: 20
      }

      const expectedResponse = {
        items: [],
        meta: expectedMeta
      }

      return new SimplePaginator(items, pageNumber).getPage()
        .should.deep.equal(expectedResponse)
    })

    it('sets the page size passed into the constructor to the pagination`s page size', () => {
      const pageSize = 1
      const pageNumber = 1
      const items = [ 'a', 'b' ]

      const expectedItems = [ 'a' ]
      const expectedMeta = {
        ...baseMeta,
        endIndex: 1,
        pageSize: 1,
        hasMore: true
      }

      const expectedResponse = {
        items: expectedItems,
        meta: expectedMeta
      }

      return new SimplePaginator(items, pageNumber, pageSize).getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#setArray', () => {
    const items = [ 'a', 'b', 'c' ]

    it('returns an instance of `SimplePaginator`', () => {
      return simplePaginator.setArray(items)
        .should.be.instanceOf(SimplePaginator)
    })

    it('returns the array passed when `getPage` is called after setting the array', () => {
      const expectedResponse = {
        items,
        meta: baseMeta
      }

      return simplePaginator.setArray(items)
        .getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#getPage', () => {
    it('returns all items when `pageSize` is `10` and there are `7` items', () => {
      const items = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]

      const expectedResponse = {
        items,
        meta: baseMeta
      }

      simplePaginator.setArray(items)

      return simplePaginator.getPage()
        .should.deep.equal(expectedResponse)
    })

    it('returns `meta.hasMore` as `false` when there are `10` items and `pageSize` is 10', () => {
      const items = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]

      const expectedResponse = {
        items,
        meta: baseMeta
      }

      simplePaginator.setArray(items)

      return simplePaginator.getPage()
        .should.deep.equal(expectedResponse)
    })

    it('returns `meta.hasMore` as `true` when there are `11` items and `pageSize` is 10', () => {
      const items = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ]
      const expectedItems = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]
      const expectedResponse = {
        items: expectedItems,
        meta: {
          ...baseMeta,
          hasMore: true
        }
      }

      simplePaginator.setArray(items)

      return simplePaginator.getPage()
        .should.deep.equal(expectedResponse)
    })

    it('returns `1` item when `pageNumber` is `2`, `pageSize` is `10` and there are `11` items', () => {
      const items = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ]
      const expectedItems = [ 'k' ]
      const expectedResponse = {
        items: expectedItems,
        meta: {
          ...baseMeta,
          pageSize: 10,
          endIndex: 20,
          pageNumber: 2,
          startIndex: 10
        }
      }

      simplePaginator.setArray(items)
        .incrementPage()

      return simplePaginator.getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#incrementPage', () => {
    it('returns an instance of `SimplePaginator`', () => {
      return simplePaginator.incrementPage()
        .should.be.instanceOf(SimplePaginator)
    })

    it('reflects the increment in `pageNumber` in the response from `getPage`', () => {
      const expectedResponse = {
        items: [],
        meta: {
          ...baseMeta,
          pageSize: 10,
          endIndex: 20,
          pageNumber: 2,
          startIndex: 10
        }
      }

      return simplePaginator.incrementPage()
        .getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#decrementPage', () => {
    it('returns an instance of `SimplePaginator`', () => {
      return simplePaginator.decrementPage()
        .should.be.instanceOf(SimplePaginator)
    })

    it('does not decrement the `pageNumber` below `0` in the response from `getPage`', () => {
      const expectedResponse = {
        items: [],
        meta: baseMeta
      }

      return simplePaginator.setPageNumber(1)
        .decrementPage()
        .getPage()
        .should.deep.equal(expectedResponse)
    })

    it('reflects the decrement in `pageNumber` in the response from `getPage` when the `pageNumber` was `4`', () => {
      const expectedResponse = {
        items: [],
        meta: {
          ...baseMeta,
          pageSize: 10,
          endIndex: 30,
          pageNumber: 3,
          startIndex: 20
        }
      }

      return simplePaginator.setPageNumber(4)
        .decrementPage()
        .getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#setPageNumber', () => {
    it('returns an instance of `SimplePaginator`', () => {
      return simplePaginator.setPageNumber(2)
        .should.be.instanceOf(SimplePaginator)
    })

    it('reflects the set `pageNumber` is `1` in the response from `getPage` when a value lower than `1` is passed', () => {
      const expectedResponse = {
        items: [],
        meta: baseMeta
      }

      return simplePaginator.setPageNumber(-2)
        .getPage()
        .should.deep.equal(expectedResponse)
    })

    it('reflects the set `pageNumber` in the response from `getPage`', () => {
      const expectedResponse = {
        items: [],
        meta: {
          ...baseMeta,
          pageSize: 10,
          endIndex: 20,
          pageNumber: 2,
          startIndex: 10
        }
      }

      return simplePaginator.setPageNumber(2)
        .getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#setPageSize', () => {
    it('returns an instance of `SimplePaginator`', () => {
      return simplePaginator.setPageSize(0)
        .should.be.instanceOf(SimplePaginator)
    })

    it('reflects the set `pageSize` is `1` in the response from `getPage` when a value lower than `1` is passed', () => {
      const expectedResponse = {
        items: [],
        meta: {
          ...baseMeta,
          endIndex: 1,
          pageSize: 1
        }
      }

      return simplePaginator.setPageSize(-2)
        .getPage()
        .should.deep.equal(expectedResponse)
    })

    it('reflects the set `pageSize` in the response from `getPage`', () => {
      const expectedResponse = {
        items: [],
        meta: {
          ...baseMeta,
          endIndex: 3,
          pageSize: 3
        }
      }

      return simplePaginator.setPageSize(3)
        .getPage()
        .should.deep.equal(expectedResponse)
    })
  })

  describe('#getTotalPages', () => {
    it('returns a number representing the total number of pages the paginator can create', () => {
      return simplePaginator.getTotalPages()
        .should.deep.equal(0)
    })
  })
})
