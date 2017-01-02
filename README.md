# Pure Assign

Drop-in replacement for
[Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
for "updating" immutable objects. Unlike `Object.assign()`, `pureAssign()` will not create a new
object if no properties change.

[![Build Status](https://travis-ci.org/dphilipson/pure-assign.svg?branch=master)](https://travis-ci.org/dphilipson/pure-assign)

## Installation

```
npm install --save pure-assign
```

## Motivation

Many JavaScript programs treat objects as immutable data. For instance, this is recommended by
React and required by Redux. Such programs typically replace object mutation:
``` javascript
userObject.firstName = "Anastasia";
userObject.lastName = "Steele";
```
with calls to `Object.assign()`, creating a new object with the updated values:
``` javascript
const updatedUserObject = Object.assign({}, userObject, {
  firstName: "Anastasia",
  lastName: "Steele"
});
```
or alternatively with [ES7's spread operator](https://github.com/sebmarkbage/ecmascript-rest-spread)
and an appropriate transpiler:
``` javascript
const updatedUserObject = {
  ...userObject,
  firstName: "Anastasia",
  lastName: "Steele",
};
```
A drawback of this approach is that a new object is created even if the new properties are identical
to the old ones. Beyond the minor performance impact, this can have greater consequences if certain
updates are triggered by data "changes." For example, React developers may attempt to avoid
unnecessary re-renders by using
[PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent), which
only performs an update if its props have "changed" according to a shallow-equality check. This means
that if your updates create new objects with the same values, they will re-render unnecessarily since
the old props do not have object-equality with the new props, despite having the same values.

This is where `pureAssign()` comes in. `pureAssign(object, updates)` is equivalent to
`Object.assign({}, object, updates)`, but will return the original object if nothing would be
changed. For instance:
``` javascript
import pureAssign from "pure-assign";

const userObject = { firstName: "Anastasia", lastName: "Steele" };
const updatedUserObject = pureAssign(userObject, { firstName: "Anastasia" });
console.log(userObject === updatedUserObject); // true
```
Note that unlike `Object.assign()`, the first argument of `{}` is absent.

For TypeScript users, `pureAssign` has an additional advantage in that it catches type errors
of the following form, which would be uncaught if using `Object.assign()` or object spread:
``` javascript
import pureAssign from "pure-assign";

const userObject = { firstName: "Anastasia", lastName: "Steele" };

const updatedUserObject = pureAssign(userObject, { firstNarm: "Ana" });
// Type error because "firstNarm" is not a property of userObject.
```

Copyright © 2017 David Philipson
