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
        const object: { a: number; b?: number } = { a: 1 };
        const actual = pureAssign(object, { b: undefined });
        const expected = { a: 1, b: undefined };
        expect(actual).toEqual(expected);
        // Needed because toEqual() considers undefined and missing properties to be the same.
        expect("b" in actual).toBe(true);
    });

    it("should only apply updates that are own properties", () => {
        function TestObject(this: any) {
            this.a = 1;
            this.b = 2;
        }
        TestObject.prototype.c = 3;
        const actual = pureAssign(
            { a: 0, b: 0, c: 0 },
            new (TestObject as any)(),
        );
        const expected = { a: 1, b: 2, c: 0 };
        expect(actual).toEqual(expected);
    });

    it("should return the original if no updates are own properties", () => {
        function TestObject(this: any) {
            this.a = 1;
            this.b = 2;
        }
        TestObject.prototype.c = 3;
        const object = { a: 1, b: 2 };
        const result = pureAssign(object, new (TestObject as any)());
        expect(result).toBe(object);
    });

    it("should return the same object if no second argument is given", () => {
        const object = { a: 1, b: 2 };
        const result = pureAssign(object);
        expect(result).toBe(object);
    });

    it("should combine multiple update arguments", () => {
        const object = { a: 1, b: 2 };
        const actual = pureAssign(object, { a: 3 }, { b: 4 });
        const expected = { a: 3, b: 4 };
        expect(actual).toEqual(expected);
    });

    it("should return the same object if all values are the same after multiple arguments", () => {
        const object = { a: 1, b: 2 };
        const result = pureAssign(object, { a: 3 }, { a: 1, b: 2 });
        expect(result).toBe(object);
    });
});
