import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CollectedConsentsTable from "../CollectedConsentsTable";
import type { ChangeEvent } from "react";
import { mockedData } from "../../../mock/data";
import { CONSENTS } from "../../../utils/labels";

describe("CollectedConsentsTable", () => {
  test("render navigation properly", () => {
    render(
      <CollectedConsentsTable
        consents={[]}
        page={1}
        totalPages={3}
        handlePageChange={() => {}}
      />
    );

    const navigation = screen.getByRole("navigation");
    const prev = screen.getByRole("button", { name: /previous/i });
    const pageOne = screen.getByRole("button", { name: /1/i });
    const pageTwo = screen.getByRole("button", { name: /2/i });
    const pageThree = screen.getByRole("button", { name: /3/i });
    const next = screen.getByRole("button", { name: /next/i });

    expect(navigation).toContainElement(prev);
    expect(navigation).toContainElement(pageOne);
    expect(navigation).toContainElement(pageTwo);
    expect(navigation).toContainElement(pageThree);
    expect(navigation).toContainElement(next);

    // no page four
    expect(
      screen.queryByRole("button", { name: /4/i })
    ).not.toBeInTheDocument();
  });

  test("navigation working properly", () => {
    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
      expect(page).toBe(3);
    };

    render(
      <CollectedConsentsTable
        consents={[]}
        page={1}
        totalPages={3}
        handlePageChange={handlePageChange}
      />
    );

    const next = screen.getByRole("button", { name: /3/i });
    next.click();
  });

  test("table renders properly", () => {
    render(
      <CollectedConsentsTable
        consents={[mockedData[0], mockedData[1]]}
        page={1}
        totalPages={3}
        handlePageChange={() => {}}
      />
    );

    const firstRow = screen.getByRole("row", { name: /John Doe/i });
    expect(firstRow).toHaveTextContent("John Doe");
    expect(firstRow).toHaveTextContent("john.doe@example.com");
    expect(firstRow).toHaveTextContent(CONSENTS.NEWSLETTER);
    expect(firstRow).toHaveTextContent(CONSENTS.CONTRIBUTE);
    expect(firstRow).not.toHaveTextContent(CONSENTS.ADS);

    const secondRow = screen.getByRole("row", { name: /Jane Smith/i });
    expect(secondRow).toHaveTextContent("Jane Smith");
    expect(secondRow).toHaveTextContent("jane.smith@example.com");
    expect(secondRow).toHaveTextContent(CONSENTS.ADS);
    expect(secondRow).not.toHaveTextContent(CONSENTS.CONTRIBUTE);
    expect(secondRow).not.toHaveTextContent(CONSENTS.NEWSLETTER);
  });

  test("should have correct column headers", () => {
    render(
      <CollectedConsentsTable
        consents={[]}
        page={1}
        totalPages={3}
        handlePageChange={() => {}}
      />
    );

    const headers = screen.getAllByRole("columnheader");
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Email");
    expect(headers[2]).toHaveTextContent("Consent given for");
  });
});
