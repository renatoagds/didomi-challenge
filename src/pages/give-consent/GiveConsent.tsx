import Box from "@mui/material/Box";
import GiveConsentForm from "./GiveConsentForm";
import useConsentForm from "./useConsentForm";

export default function GiveConsent() {
  const {
    handleSubmit,
    handleCheckboxChange,
    handleNameChange,
    handleEmailChange,
    submitting,
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
        handleSubmit={handleSubmit}
        handleCheckboxChange={handleCheckboxChange}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        submitting={submitting}
        name={name}
        email={email}
        consent={consent}
        valid={valid}
      />
    </Box>
  );
}
