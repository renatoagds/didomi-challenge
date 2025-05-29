import { beforeEach, describe, expect, test, vi, type Mock } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useConsentForm from "../useConsentForm";

const navigate = vi.fn();

vi.mock("react-router", () => {
  const useNavigate = vi.fn(() => navigate);
  const actual = vi.importActual("react-router");
  return {
    useNavigate,
    ...actual,
  };
});

describe("useConsentForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, "fetch");
    navigate.mockClear();
    (window.fetch as Mock).mockClear();
  });

  test("should handle name correctly", () => {
    const { result } = renderHook(() => useConsentForm());
    const { handleNameChange } = result.current;

    act(() => {
      handleNameChange({
        target: { value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.name).toBe("John Doe");
  });

  test("should handle email correctly", () => {
    const { result } = renderHook(() => useConsentForm());
    const { handleEmailChange } = result.current;

    act(() => {
      handleEmailChange({
        target: { value: "john.doe@example.com", checkValidity: () => true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.email.value).toBe("john.doe@example.com");
    expect(result.current.email.valid).toBe(true);
  });

  test("should handle checkbox changes correctly", () => {
    const { result } = renderHook(() => useConsentForm());
    const { handleCheckboxChange } = result.current;

    act(() => {
      handleCheckboxChange({
        target: { name: "newsletter", checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.consent.newsletter).toBe(true);
    expect(result.current.consent.ads).toBe(false);
    expect(result.current.consent.contribute).toBe(false);

    act(() => {
      handleCheckboxChange({
        target: { name: "ads", checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.consent.ads).toBe(true);
  });

  test("should validate form correctly", () => {
    const { result } = renderHook(() => useConsentForm());
    const { handleNameChange, handleEmailChange, handleCheckboxChange } =
      result.current;

    act(() => {
      handleNameChange({
        target: { value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // false because email and checkbox is not set yet
    expect(result.current.valid).toBe(false);

    act(() => {
      handleEmailChange({
        target: { value: "john.doe@example.com", checkValidity: () => true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // false because checkbox is not set yet
    expect(result.current.valid).toBe(false);

    act(() => {
      handleCheckboxChange({
        target: { name: "newsletter", checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // everything is set, so valid should be true
    expect(result.current.valid).toBe(true);

    act(() => {
      handleNameChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // name now is empty, so valid should be false
    expect(result.current.valid).toBe(false);

    act(() => {
      handleNameChange({
        target: { value: "Jhon Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // name is set again, so valid should be true
    expect(result.current.valid).toBe(true);

    act(() => {
      handleEmailChange({
        target: { value: "john.doe", checkValidity: () => false },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // email is invalid, so valid should be false
    expect(result.current.valid).toBe(false);

    act(() => {
      handleEmailChange({
        target: { value: "john.doe@example.com", checkValidity: () => true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // email is set again, so valid should be true
    expect(result.current.valid).toBe(true);

    act(() => {
      handleCheckboxChange({
        target: { name: "newsletter", checked: false },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // checkbox is unchecked, so valid should be false
    expect(result.current.valid).toBe(false);
  });

  test("should submit form and navigate on success", async () => {
    const { result } = renderHook(() => useConsentForm());
    const { handleNameChange, handleEmailChange, handleCheckboxChange } =
      result.current;

    act(() => {
      handleNameChange({
        target: { value: "John Doe" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      handleEmailChange({
        target: { value: "john.doe@example.com", checkValidity: () => true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      handleCheckboxChange({
        target: { name: "newsletter", checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.submitting).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(window.fetch).toHaveBeenCalledWith("/consents", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
        email: "john.doe@example.com",
        consent: {
          newsletter: true,
          ads: false,
          contribute: false,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result.current.submitting).toBe(false);
    expect(navigate).toHaveBeenCalledWith("/collected-consents");
  });
});
