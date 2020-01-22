# Simple Paginator
[![NPM Version](https://badge.fury.io/js/skaleb-simple-paginator.svg)](https://badge.fury.io/js/skaleb-simple-paginator)
[![Build Status](https://travis-ci.org/ToeFungi/skaleb-simple-paginator.svg?branch=master)](https://travis-ci.org/ToeFungi/skaleb-simple-paginator)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=skaleb-simple-paginator&metric=alert_status)](https://sonarcloud.io/dashboard?id=skaleb-simple-paginator)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=skaleb-simple-paginator&metric=bugs)](https://sonarcloud.io/dashboard?id=skaleb-simple-paginator)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=skaleb-simple-paginator&metric=code_smells)](https://sonarcloud.io/dashboard?id=skaleb-simple-paginator)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=skaleb-simple-paginator&metric=coverage)](https://sonarcloud.io/dashboard?id=skaleb-simple-paginator)

This simple paginator was built to allow for easily paginating through arrays that may be client side. Usually these 
types of things take place when the data is being sourced from either a database or API but on the odd occasion, it 
could arise that you already have too much data client side. This paginator provides a simple interface to manipulate
these arrays.

This paginator was built specifically with TypeScript in mind.

## Contents
- [Installation](#installation)
- [Usage](#usage)
    - [Importing](#importing)
    - [Instantiate instance](#instantiating)
    - [Setting array](#set-initial-dataset)
    - [Fetching page](#get-current-page)
    - [Next page](#increase-page-number)
    - [Previous page](#decrease-page-number)
    - [Setting page](#set-page-number)
    - [Setting page size](#set-page-size)
- [Testing](#tests)
- [Issues](#issues)
- [Contributions](#contributions)
- [License](#license)

## Installation
To install this package you can simply use the install command below.
```bash
$ npm i --save skaleb-simple-paginator
```

## Usage
#### Importing
Importing the package into your class.
```typescript
import { SimplePaginator } from 'skaleb-simple-paginator'

// Variables that will be used below in `Instantiation`
const pageSize: number = 5
const pageNumber: number = 1
const arr: Array<string> = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
```

#### Instantiating
Instantiating a new instance of the paginator.
```typescript
const paginator = new SimplePaginator<string>()
  .setArray(arr)
  .setPageSize(pageSize)
  .setPageNumber(pageNumber)

// You can also instantiate the `SimplePaginator` with the variables in the constructor
const paginator = new SimplePaginator(arr, pageNumber, pageSize)
```

#### Set Initial Dataset
`.setArray(x)` sets the array to be paginated. The returned items should retain their types.
```typescript
// The paginator will use the array defined above to paginate
paginator.setArray(arr)
```

#### Get Current Page
`.getPage()` returns the number of items specified which are on the page specified.
```typescript
// Will return `PaginatorResponse` with five items being equal to
// [ 'a', 'b', 'c', 'd', 'e' ]
return paginator.getPage()
```

#### Increase Page Number
`.incrementPage()` increases the page number within the paginator by one.
```typescript
// Will return `PaginatorResponse` with two items being equal to
// [ 'f', 'g' ]
return paginator.incrementPage()
  .getPage()
```

#### Decrease Page Number
`.decrementPage()` decreases the page number within the paginator by one. If the page number is less than one then the 
page number defaults to one.
```typescript
// Will return `PaginatorResponse` with five items being equal to
// [ 'a', 'b', 'c', 'd', 'e' ]
return paginator.decrementPage()
  .getPage()
```

#### Set Page Number
`.setPageNumber(x)` sets the page number within the paginator to the value specified. If the value specified is less
than one then the page number defaults to one.
```typescript
// Will return `PaginatorResponse` with two items being equal to
// [ 'f', 'g' ]
return paginator.setPageNumber(2)
  .getPage()

// Will return `PaginatorResponse` with five items being equal to
// [ 'a', 'b', 'c', 'd', 'e' ]
return paginator.setPageNumber(-1)
  .getPage()
``` 

#### Set Page Size
`.setPageSize(x)` sets the number of items to be returned in the `PaginatorResponse` for any given page to the value
specified. If the value specified is less than one then the page size defaults to one. 
```typescript
// Will return `PaginatorResponse` with three items being equal to
// [ 'a', 'b', 'c' ]
return paginator.setPageSize(3)
  .getPage()

// Will return `PaginatorResponse` with one item being equal to
// [ 'a' ]
return paginator.setPageSize(-1)
  .getPage()
```

## Tests
This project is completely covered by unit tests. Various cases have been accounted for both in the codebase and in the
tests covering it. If a bug is picked up regarding the test suite or code, feel free to make a contribution to help
correct the bug.

To run the tests, you can simply run the following `test` command/s.
```bash
npm run lint
npm run test
npm run coverage
```

## Issues
If you find any problems while working with this library, please log an issue 
[here](https://github.com/ToeFungi/skaleb-simple-paginator/issues) so that development can begin to rectify the 
error.

## Contributions
This project is completely open source and as such, you are invited to make contributions. Fork the project, make some
changes and make the pull request. Should you have any feedback regarding the functionality, please don't hesitate to
open an issue so this can be resolved. Please ensure that any pull requests have unit tests that cover any additional
functionality.

## License
MIT License

Copyright (c) 2019 Alex Pickering
