import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { CONSENTS } from "../../utils/labels";

export default function GiveConsentForm({
  handleSubmit,
  handleCheckboxChange,
  handleNameChange,
  handleEmailChange,
  submitting,
  name,
  email,
  consent,
  valid,
}: {
  handleSubmit: () => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitting: boolean;
  name: string;
  email: { value: string; valid: boolean };
  consent: { newsletter: boolean; ads: boolean; contribute: boolean };
  valid: boolean;
}) {
  return (
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
            label={CONSENTS.NEWSLETTER}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="ads"
                onChange={handleCheckboxChange}
                checked={consent.ads}
              />
            }
            label={CONSENTS.ADS}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="contribute"
                onChange={handleCheckboxChange}
                checked={consent.contribute}
              />
            }
            label={CONSENTS.CONTRIBUTE}
          />
        </FormGroup>
      </FormControl>
      <Button
        variant="contained"
        type="button"
        sx={{ width: "fit-content", alignSelf: "center" }}
        disabled={!valid || submitting}
        loading={submitting}
        onClick={handleSubmit}
      >
        Give Consent
      </Button>
    </Box>
  );
}
