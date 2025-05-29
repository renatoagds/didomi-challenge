import useConsentData from "./useConsentData";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import CollectedConsentsTable from "./CollectedConsentsTable";

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
        <CollectedConsentsTable
          consents={consents}
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </Box>
  );
}
