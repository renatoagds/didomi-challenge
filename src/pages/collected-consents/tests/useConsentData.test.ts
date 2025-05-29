import { beforeEach, describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useConsentData, { PAGE_SIZE } from "../useConsentData";
import { mockedData } from "../../../mock/data";
import type { ChangeEvent } from "react";

describe("useConsentData", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  test("should initially load data properly", async () => {
    const { result } = renderHook(() => useConsentData());

    expect(result.current.loading).toBe(true);
    expect(result.current.consents).toEqual([]);
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.consents).toHaveLength(PAGE_SIZE);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.consents[0].id).toBe(mockedData[0].id);
  });

  test("should handle page change correctly", async () => {
    const { result } = renderHook(() => useConsentData());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    act(() => {
      result.current.handlePageChange({} as ChangeEvent, 2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.consents[0].id).toBe(mockedData[2].id);
  });
});
