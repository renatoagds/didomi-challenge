import type { ConsentData } from "../utils/types";

export const mockedData: Array<ConsentData> = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    consent: {
      newsletter: true,
      ads: false,
      contribute: true,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    consent: {
      newsletter: false,
      ads: true,
      contribute: false,
    },
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    consent: {
      newsletter: true,
      ads: true,
      contribute: false,
    },
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    consent: {
      newsletter: false,
      ads: false,
      contribute: true,
    },
  },
  {
    id: "5",
    name: "Charlie White",
    email: "charlie.white@example.com",
    consent: {
      newsletter: true,
      ads: false,
      contribute: true,
    },
  },
];

export function getData(): Array<ConsentData> {
  return mockedData;
}

export function addData(newEntry: Omit<ConsentData, "id">): Array<ConsentData> {
  const newId = (mockedData.length + 1).toString();
  const entryWithId = { ...newEntry, id: newId };
  mockedData.push(entryWithId);
  return mockedData;
}
