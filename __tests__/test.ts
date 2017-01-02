import pureAssign from "../src/index";

describe("pureAssign()", () => {
    it("should return the same object if updates are empty", () => {
        const object = { a: 1, b: 2 };
        const result = pureAssign(object, {});
        expect(result).toBe(object);
    });

    it("should return an object with updated values", () => {
        const actual = pureAssign({ a: 1, b: 2 }, { a: 3 });
        const expected = { a: 3, b: 2 };
        expect(actual).toEqual(expected);
    });

    it("should return the same object if all updated values equal the old ones", () => {
        const object = { a: 1, b: 2 };
        const result = pureAssign(object, { a: 1 });
        expect(result).toBe(object);
    });

    it("should treat a missing key differently from undefined", () => {
        const object: { a: number, b?: number } = { a: 1 };
        const result = pureAssign(object, { b: undefined });
        expect("b" in result).toBeTruthy();
    });
});
