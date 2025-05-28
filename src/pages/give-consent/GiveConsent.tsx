import { Box } from "@mui/material";
import GiveConsentForm from "./GiveConsentForm";
import useConsentForm from "./useConsentForm";

export default function GiveConsent() {
  const {
    handleCheckboxChange,
    handleNameChange,
    handleEmailChange,
    name,
    email,
    consent,
    valid,
  } = useConsentForm();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GiveConsentForm
        handleCheckboxChange={handleCheckboxChange}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        name={name}
        email={email}
        consent={consent}
        valid={valid}
      />
    </Box>
  );
}
