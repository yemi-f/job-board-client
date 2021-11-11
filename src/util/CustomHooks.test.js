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
    const val = ["Asda", "sfs", "Dfgdf"];
    const { result } = renderHook(() => useArrayInput(val));

    expect(result.current.value.join("")).toBe(val.join(""));
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
