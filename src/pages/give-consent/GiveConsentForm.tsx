import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

export default function GiveConsentForm({
  handleCheckboxChange,
  handleNameChange,
  handleEmailChange,
  name,
  email,
  consent,
  valid,
}: {
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  );
}
