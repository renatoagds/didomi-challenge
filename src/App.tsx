import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

/* Pages */
import GiveConsent from "./pages/GiveConsent";
import CollectedConsents from "./pages/CollectedConsents";
import { Link, Navigate, Route, Routes } from "react-router";

const DRAWER_WIDTH = 240;

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/give-consent">
                <ListItemText primary="Give consent" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/collected-consents">
                <ListItemText primary="Collected consents" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
          <Routes>
            <Route index path="/" element={<Navigate to="/give-consent" />} />
            <Route path="/give-consent" element={<GiveConsent />} />
            <Route path="/collected-consents" element={<CollectedConsents />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
