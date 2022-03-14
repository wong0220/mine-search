import { TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SetMine } from "./features/mine/mineSlice";

function Tc({ row, cell, rowIndex, cellIndex }) {
  const tableData = useSelector((state) => state.mine.tableData);
  const dispatch = useDispatch();

  console.log(tableData);
  return (
    <TableCell
      sx={{
        bgcolor: "gray",
        border: "1px solid black",
        boxShadow: 5,
        borderRadius: 1,
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(SetMine([row, cell, rowIndex, cellIndex]));
      }}
    >
      {!!tableData.length ? tableData[rowIndex][cellIndex] : ""}
    </TableCell>
  );
}

export default Tc;
