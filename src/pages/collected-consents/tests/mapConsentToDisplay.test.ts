import { expect, test } from "vitest";
import mapConsentToDisplay from "../mapConsentToDisplay";
import { mockedData } from "../../../mock/data";
import { CONSENTS } from "../../../utils/labels";

test.each([
  [mockedData[0].consent, `${CONSENTS.NEWSLETTER}, ${CONSENTS.CONTRIBUTE}`],
  [mockedData[1].consent, `${CONSENTS.ADS}`],
  [mockedData[2].consent, `${CONSENTS.NEWSLETTER}, ${CONSENTS.ADS}`],
  [mockedData[3].consent, `${CONSENTS.CONTRIBUTE}`],
  [mockedData[4].consent, `${CONSENTS.NEWSLETTER}, ${CONSENTS.CONTRIBUTE}`],
])("should map (%$) consent to display", (consent, expected) => {
  expect(mapConsentToDisplay(consent)).toEqual(expected);
});
