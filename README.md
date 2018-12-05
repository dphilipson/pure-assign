# Pure Assign

Drop-in replacement for
[`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
for "updating" immutable objects. Unlike `Object.assign()`, `pureAssign()` will
not mutate the base object, nor will it create a new object if no properties
change.

[![Build
Status](https://travis-ci.org/dphilipson/pure-assign.svg?branch=master)](https://travis-ci.org/dphilipson/pure-assign)

## Installation

With Yarn:

```
yarn add pure-assign
```

With NPM:

```
npm install pure-assign
```

## Usage in Brief

```ts
pureAssign(object, ...updates);
```

is equivalent to

```ts
Object.assign({}, object, ...updates);
```

except that it returns the original instance `object` if the result would have
the same values as the original.

## Usage in Detail

`pureAssign()` takes one or more arguments. The first argument is a base object,
and the remaining arguments are any number of objects whose properties should be
merged with those of the base object to produce a new object. Unlike
[`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign),
the first argument is not modified. For example:

```ts
import pureAssign from "pure-assign";

const user = { firstName: "Anastasia", lastName: "Steele" };
const updatedUser = pureAssign(user, { firstName: "Ana" });
console.log(user); // -> { firstName: "Anastasia", lastName: "Steele" }
console.log(updatedUser); // -> { firstName: "Ana", lastName: "Steele" }
```

If the resulting object would differ from the original, then a new object is
created and returned. Otherwise, the original instance is returned. For example:

```ts
const user = { firstName: "Anastasia", lastName: "Steele" };
const updatedUser = pureAssign(user, { firstName: "Anastasia" });
console.log(user === updatedUser); // -> true
```

For TypeScript users, `pureAssign` has an additional advantage in that it
catches type errors of the following form, which would be uncaught if using
`Object.assign()` or object spread:

```javascript
const user = { firstName: "Anastasia", lastName: "Steele" };
const updatedUser = pureAssign(userObject, { firstNarm: "Ana" });
// Type error because "firstNarm" is not a property of user.
```

## Motivation

Many JavaScript programs treat objects as immutable data. For instance, this is
recommended by React and required by Redux. Such programs typically replace
object mutation:

```javascript
const user = { firstName: "Anastasia", lastName: "Steele" };
user.firstName = "Ana";
```

with calls to `Object.assign()`, creating a new object with the updated values:

```javascript
const updatedUser = Object.assign({}, user, {
    firstName: "Ana",
});
```

or alternatively with [ES7's spread
operator](https://github.com/sebmarkbage/ecmascript-rest-spread) and an
appropriate transpiler:

```javascript
const updatedUser = { ...user, firstName: "Ana" };
```

A drawback of this approach is that a new object is created even if the new
properties are identical to the old ones. This may have performance implications
if certain updates are triggered by data "changes." For example, React
developers may attempt to avoid unnecessary re-renders by using
[`PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent) or
[`React.memo()`](https://reactjs.org/docs/react-api.html#reactmemo), which only
performs an update if its props have "changed" according to a shallow-equality
check. This means that if your updates create new objects with the same values,
they will trigger unnecessary rerenders since the old props do not have
object-equality with the new props, despite being functionally identical.

This is where `pureAssign()` comes in. By returning the same instance in cases
where the values haven't changed, `pureAssign` avoids triggering unnecessary
updates which use object-equality to determine whether the state has changed.

Copyright © 2017 David Philipson
