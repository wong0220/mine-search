import { Box, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import SelectBox from "./SelectBox";
import TableM from "./TableM";

function MineSearch() {
  const level = useSelector((state) => state.mine.level);
  const isWin = useSelector((state) => state.mine.isWin);
  console.log(isWin);
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
        {isWin && <Alert severity="success">승리하셨습니다!</Alert>}
        <Box sx={{ mt: 3 }}>
          <TableM level={level} />
        </Box>
      </Box>
    </Box>
  );
}

export default MineSearch;
