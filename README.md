# Simple Paginator
[![Build Status](https://travis-ci.org/ToeFungi/skaleb-simple-paginator.svg?branch=master)](https://travis-ci.org/ToeFungi/skaleb-simple-paginator)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_skaleb-simple-paginator&metric=alert_status)](https://sonarcloud.io/dashboard?id=ToeFungi_skaleb-simple-paginator)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_skaleb-simple-paginator&metric=bugs)](https://sonarcloud.io/dashboard?id=ToeFungi_skaleb-simple-paginator)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_skaleb-simple-paginator&metric=code_smells)](https://sonarcloud.io/dashboard?id=ToeFungi_skaleb-simple-paginator)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ToeFungi_skaleb-simple-paginator&metric=coverage)](https://sonarcloud.io/dashboard?id=ToeFungi_skaleb-simple-paginator)

This simple paginator was built to allow for easily paginating through arrays that may be client side. Usually these 
types of things take place when the data is being sourced from either a database or API but on the odd occasion, it 
could arise that you already have too much data client side. This paginator provides a simple interface to manipulate
these arrays.

This paginator was built specifically with TypeScript in mind.

## Installation
To install this package you can simply use the install command below.
```bash
$ npm i --save skaleb-simple-paginator
```

## How To Use
Importing the package into your class.
```javascript
import { SimplePaginator } from './SimplePaginator'

// Variables that will be used below in `Instantiation`
const pageSize: number = 5
const pageNumber: number = 1
const arr: Array<string> = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
```

Instantiating a new instance of the paginator.
```javascript
const paginator = new SimplePaginator<string>()
  .setArray(arr)
  .setPageSize(pageSize)
  .setPageNumber(pageNumber)

// You can also instantiate the `SimplePaginator` with the variables in the constructor
const paginator = new SimplePaginator(arr, pageNumber, pageSize)
```

`.setArray(x)` sets the array to be paginated. The returned items should retain their types.
```javascript
// The paginator will use the array defined above to paginate
paginator.setArray(arr)
```

`.getPage()` returns the number of items specified which are on the page specified.
```javascript
// Should return `PaginatorResponse` with five items being equal to
// [ 'a', 'b', 'c', 'd', 'e' ]
console.log('Page 1 from paginator', paginator.getPage())
```

`.incrementPage()` increases the page number within the paginator by one.
```javascript
// Should return `PaginatorResponse` with two items being equal to
// [ 'f', 'g' ]
console.log('Page 2 from paginator', paginator.incrementPage()
  .getPage())
```

`.decrementPage()` decreases the page number within the paginator by one. If the page number is less than one then the 
page number defaults to one.
```javascript
// Should return `PaginatorResponse` with five items being equal to
// [ 'a', 'b', 'c', 'd', 'e' ]
console.log('Page 1 from paginator', paginator.decrementPage()
  .getPage())
```

`.setPageNumber(x)` sets the page number within the paginator to the value specified. If the value specified is less
than one then the page number defaults to one.
```javascript
// Should return `PaginatorResponse` with two items being equal to
// [ 'f', 'g' ]
console.log('Page 2 from paginator', paginator.setPageNumber(2)
  .getPage())

// Should return `PaginatorResponse` with five items being equal to
// [ 'a', 'b', 'c', 'd', 'e' ]
console.log('Page 1 from paginator', paginator.setPageNumber(-1)
  .getPage())
``` 

`.setPageSize(x)` sets the number of items to be returned in the `PaginatorResponse` for any given page to the value
specified. If the value specified is less than one then the page size defaults to one. 
```javascript
// Should return `PaginatorResponse` with three items being equal to
// [ 'a', 'b', 'c' ]
console.log('Page 1 from paginator', paginator.setPageSize(3)
  .getPage())

// Should return `PaginatorResponse` with one item being equal to
// [ 'a' ]
console.log('Page 1 from paginator', paginator.setPageSize(-1)
  .getPage())
```

## Tests
This project is completely covered by unit tests. Various cases have been accounted for both in the codebase and in the
tests covering it. If a bug is picked up regarding the test suite or code, feel free to make a contribution to help
correct the bug.

To run the tests, you can simply run the following `test` command/s.
```bash
npm run test
npm run coverage
npm run lint
```

## Contributions
Feedback and contributions are more than welcome. Should you feel there is something you wish to contribute to this 
paginator, feel free to make a merge request. Ensure that whatever proposed change, has tests covering various cases for
the change. 
