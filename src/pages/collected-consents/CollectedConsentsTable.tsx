import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import mapConsentToDisplay from "./mapConsentToDisplay";
import Pagination from "@mui/material/Pagination";
import type { ConsentData } from "../../utils/types";

export default function CollectedConsentsTable({
  consents,
  page,
  totalPages,
  handlePageChange,
}: {
  consents: Array<ConsentData>;
  page: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  return (
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
                <TableCell>{mapConsentToDisplay(consent.consent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </>
  );
}
