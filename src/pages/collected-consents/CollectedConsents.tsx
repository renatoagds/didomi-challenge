import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import mapConsentToDisplay from "./mapConsentToDisplay";
import useConsentData from "./useConsentData";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

export default function CollectedConsents() {
  const { loading, consents, page, totalPages, handlePageChange } =
    useConsentData();

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={240} />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Consent given for</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consents.map((consent) => (
                  <TableRow
                    key={consent.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {consent.name}
                    </TableCell>
                    <TableCell>{consent.email}</TableCell>
                    <TableCell>
                      {mapConsentToDisplay(consent.consent)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
}
