import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

const useConsentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [consent, setConsent] = useState({
    newsletter: false,
    ads: false,
    contribute: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setConsent((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({
      value: event.target.value,
      valid: event.target.checkValidity(),
    });
  };

  const valid =
    (consent.newsletter || consent.ads || consent.contribute) &&
    name &&
    email.valid;

  return {
    handleCheckboxChange,
    handleNameChange,
    handleEmailChange,
    name,
    email,
    consent,
    valid,
  };
};

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          gap: 2,
        }}
      >
        <FormGroup row sx={{ gap: 2 }}>
          <TextField
            value={name}
            id="name"
            label="Name"
            required
            variant="outlined"
            onChange={handleNameChange}
          />
          <TextField
            value={email.value}
            id="email"
            label="Email"
            required
            variant="outlined"
            type="email"
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormControl component="fieldset" variant="standard" required>
          <FormLabel
            component="legend"
            sx={{
              width: "100%",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            I agree to:
          </FormLabel>
          <FormGroup sx={{ border: "1px solid #ccc", padding: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="newsletter"
                  onChange={handleCheckboxChange}
                  checked={consent.newsletter}
                />
              }
              label="Receive newsletter"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="ads"
                  onChange={handleCheckboxChange}
                  checked={consent.ads}
                />
              }
              label="Be shown targeted ads"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="contribute"
                  onChange={handleCheckboxChange}
                  checked={consent.contribute}
                />
              }
              label="Contribute to anonymous visit statistics"
            />
          </FormGroup>
        </FormControl>
        <Button
          variant="contained"
          type="button"
          sx={{ width: "fit-content", alignSelf: "center" }}
          disabled={!valid}
        >
          Give Consent
        </Button>
      </Box>
    </Box>
  );
}
