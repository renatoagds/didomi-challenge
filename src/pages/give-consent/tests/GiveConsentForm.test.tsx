import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GiveConsentForm from "../GiveConsentForm";
import { userEvent } from "@testing-library/user-event";

describe("GiveConsentForm", () => {
  test("name input work properly", async () => {
    const user = userEvent.setup();
    const handleNameChange = vi.fn();

    const { rerender } = render(
      <GiveConsentForm
        handleNameChange={handleNameChange}
        handleCheckboxChange={() => {}}
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        submitting={false}
        valid={true}
        name=""
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, "John Doe");
    expect(handleNameChange).toHaveBeenCalledTimes(8); // "John Doe" has 8 characters

    rerender(
      <GiveConsentForm
        handleNameChange={handleNameChange}
        handleCheckboxChange={() => {}}
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        submitting={false}
        valid={true}
        name="John Doe"
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    expect(nameInput).toHaveValue("John Doe");
  });

  test("email input work properly", async () => {
    const user = userEvent.setup();
    const handleEmailChange = vi.fn();

    const { rerender } = render(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={() => {}}
        handleEmailChange={handleEmailChange}
        handleSubmit={() => {}}
        submitting={false}
        valid={true}
        name=""
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "john.doe@example.com");
    expect(handleEmailChange).toHaveBeenCalledTimes(20); // email has 22 characters

    rerender(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={() => {}}
        handleEmailChange={handleEmailChange}
        handleSubmit={() => {}}
        submitting={false}
        valid={true}
        name=""
        email={{ value: "john.doe@example.com", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  test("checkboxes work properly", async () => {
    const user = userEvent.setup();
    const handleCheckboxChange = vi.fn();

    render(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={handleCheckboxChange}
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        submitting={false}
        valid={true}
        name=""
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    const newsletterCheckbox = screen.getByLabelText(/newsletter/i);
    const adsCheckbox = screen.getByLabelText(/ads/i);
    const contributeCheckbox = screen.getByLabelText(/contribute/i);

    await user.click(newsletterCheckbox);
    expect(handleCheckboxChange).toHaveBeenCalledTimes(1);

    await user.click(adsCheckbox);
    expect(handleCheckboxChange).toHaveBeenCalledTimes(2);

    await user.click(contributeCheckbox);
    expect(handleCheckboxChange).toHaveBeenCalledTimes(3);
  });

  test("button disabled only if valid or submitting is false", () => {
    const { rerender } = render(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={() => {}}
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        submitting={false}
        valid={false}
        name=""
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    const submitButton = screen.getByRole("button", { name: /give consent/i });
    expect(submitButton).toBeDisabled();

    rerender(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={() => {}}
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        submitting={true}
        valid={true}
        name="John Doe"
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    expect(submitButton).toBeDisabled();

    rerender(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={() => {}}
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        submitting={false}
        valid={true}
        name="John Doe"
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    expect(submitButton).toBeEnabled();
  });

  test("form submits properly", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <GiveConsentForm
        handleNameChange={() => {}}
        handleCheckboxChange={() => {}}
        handleEmailChange={() => {}}
        handleSubmit={handleSubmit}
        submitting={false}
        valid={true}
        name=""
        email={{ value: "", valid: true }}
        consent={{ newsletter: false, ads: false, contribute: false }}
      />
    );

    const submitButton = screen.getByRole("button", { name: /give consent/i });
    await user.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
