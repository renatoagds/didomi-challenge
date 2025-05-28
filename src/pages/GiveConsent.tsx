import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

export default function GiveConsent() {
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
        component={"form"}
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          gap: 2,
        }}
      >
        <FormGroup row sx={{ gap: 2 }}>
          <TextField id="name" label="Name" required variant="outlined" />
          <TextField
            id="email"
            label="Email"
            required
            variant="outlined"
            type="email"
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
              control={<Checkbox name="newsletter" />}
              label="Receive newsletter"
            />
            <FormControlLabel
              control={<Checkbox name="ads" />}
              label="Be shown targeted ads"
            />
            <FormControlLabel
              control={<Checkbox name="contribute" />}
              label="Contribute to anonymous visit statistics"
            />
          </FormGroup>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "fit-content", alignSelf: "center" }}
        >
          Give Consent
        </Button>
      </Box>
    </Box>
  );
}
