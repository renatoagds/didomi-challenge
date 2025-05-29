import { CONSENTS } from "../../utils/labels";
import type { ConsentData } from "../../utils/types";

export default function mapConsentToDisplay(
  data: ConsentData["consent"]
): string {
  const consents = [];

  if (data.newsletter) consents.push(CONSENTS.NEWSLETTER);
  if (data.ads) consents.push(CONSENTS.ADS);
  if (data.contribute) consents.push(CONSENTS.CONTRIBUTE);

  return consents.join(", ");
}
