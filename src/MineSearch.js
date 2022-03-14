import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import SelectBox from "./SelectBox";
import TableM from "./TableM";

function MineSearch() {
  const level = useSelector((state) => state.mine.level);

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SelectBox />
        <TableM level={level} />
      </Box>
    </Box>
  );
}

export default MineSearch;
