import { renderHook, act } from "@testing-library/react-hooks";
import { useTextInput, useArrayInput } from "./CustomHooks";

describe("testing useTextInput", () => {
  test("initial value is not given", async () => {
    const { result } = renderHook(() => useTextInput());

    expect(result.current.value).toBe(undefined);
  });

  test("initial value is val", async () => {
    const val = "this or that";
    const { result } = renderHook(() => useTextInput(val));

    expect(result.current.value).toBe(val);
  });

  test("reset() is called", async () => {
    const val = "this or that";

    const { result } = renderHook(() => useTextInput(val));
    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe("");
  });
});

describe("testing useArrayInput", () => {
  test("initial value is not given", async () => {
    const { result } = renderHook(() => useArrayInput());

    expect(result.current.value).toBe(undefined);
  });

  test("initial value is given", async () => {
    function arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    }

    const val = ["Asda", "sfs", "Dfgdf"];
    const { result } = renderHook(() => useArrayInput(val));

    expect(arrayEquals(result.current.value, val)).toBe(true);
  });

  test("reset() is called", async () => {
    const val = ["Asda", "sfs", "Dfgdf"];

    const { result } = renderHook(() => useArrayInput(val));
    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(null);
  });
});
