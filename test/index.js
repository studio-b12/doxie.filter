import dummyData from './test-tools/dummyData';

import filter from '../module/index';

const test = require('tape-catch');
const always = require('1-liners/always');
const property = require('1-liners/curry')(require('1-liners/property'));
const title = require('1-liners/curry')(require('1-liners/plus'))(
  'Programmatic API:  '
);

test(title('Pipes data through'), (is) => {
  const input = dummyData([
    {dummyProperty: true},
    {dummyProperty: false},
  ]);

  is.deepEqual(
    filter(always(true))(input),
    input,
    'keeping comments transformed into `true`'
  );

  is.deepEqual(
    filter(always(false))(input),
    dummyData([]),
    'dropping comments transformed into `false`'
  );

  is.deepEqual(
    filter(property('dummyProperty'))(input),
    dummyData([{dummyProperty: true}]),
    'doing both things at the same time'
  );

  is.deepEqual(
    filter(always('truthy'))(input),
    input,
    'casting non-boolean return values'
  );

  is.end();
});

test(title('Fails with informative messages'), (is) => {
  is.throws(
    () => filter(/something wrong/),
    /expected a function/i,
    'when given a non-function'
  );

  is.throws(
    () => filter(() => {})(/something wrong/),
    /expected an array/i,
    'when the filter function is given a non-array'
  );

  is.end();
});
