/**
 * Drop-in replacement for `Object.assign()` for "updating" immutable objects. Unlike
 * `Object.assign()`, `pureAssign()` will not create a new object if no properties change.
 *
 * @param baseObject An object which serves as the basis for the updated values.
 * @param updates One or more objects whose values should replace the corresponding values
 *        in `baseObject`. Values in rightward objects take precedence over those in earlier ones.
 * @returns An object whose keys and values match those of `baseObject` except where they have been
 *          overridden by those of `updates`. The input objects are unchanged. If the returned
 *          object would be identical to `baseObject`, then `baseObject` is returned.
 */
export default function pureAssign<T>(
    baseObject: T,
    ...updates: Array<Partial<T>>
): T {
    if (updates.length === 0) {
        return baseObject;
    } else if (updates.length === 1) {
        return simplePureAssign(baseObject, updates[0]);
    } else {
        return simplePureAssign(baseObject, assign({}, ...updates));
    }
}

function simplePureAssign<T>(baseObject: T, update: Partial<T>): T {
    for (const key in update) {
        if (
            Object.prototype.hasOwnProperty.call(update, key) &&
            (!(key in baseObject) || baseObject[key] !== update[key])
        ) {
            return assign({}, baseObject, update);
        }
    }
    return baseObject;
}

// We need a non-arrow function to use the arguments array.
// tslint:disable:only-arrow-functions
const assign =
    (Object as any).assign ||
    function(t: any) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (const p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) {
                    t[p] = s[p];
                }
            }
        }
        return t;
    };
// tslint:enable:only-arrow-functions
