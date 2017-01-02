/**
 * Drop-in replacement for `Object.assign()` for "updating" immutable objects. Unlike
 * `Object.assign()`, `pureAssign()` will not create a new object if no properties change.
 * 
 * @param baseObject An object which serves as the basis for the updated values.
 * @param updates An object whose values should replace the corresponding values in `baseObject`.
 * @returns An object whose keys and values match those of `baseObject` except where they have been
 *          overridden by those of `updates`. The input objects are unchanged. If the returned
 *          object would be identical to `baseObject`, then `baseObject` is returned.
 */
export default function pureAssign<T>(baseObject: T, updates: Partial<T>): T {
    for (let key in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, key)
            && (!(key in baseObject)
                || baseObject[key] !== updates[key])) {
            return { ...(<any> baseObject), ...(<any> updates) };
        }
    }
    return baseObject;
}
