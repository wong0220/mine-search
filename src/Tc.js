import { TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SetMine } from "./features/mine/mineSlice";

function Tc({ row, cell, rowIndex, cellIndex }) {
  const tableData = useSelector((state) => state.mine.tableData);
  const isStop = useSelector((state) => state.mine.stop);

  const dispatch = useDispatch();

  const stylingCell = (type) => {
    if (type === 0 || type === -3) {
      return {
        bgcolor: "white",
        border: "1px solid black",
        boxShadow: 5,
        borderRadius: 1,
      };
    } else {
      return {
        bgcolor: "gray",
        border: "1px solid black",
        boxShadow: 5,
        borderRadius: 1,
        cursor: "pointer",
      };
    }
  };

  const printText = (type) => {
    if (type === 0) {
      return "";
    } else if (type === -1) {
      return "";
    } else if (type === -3) {
      return "펑";
    } else {
      return "X";
    }
  };
  return (
    <TableCell
      sx={
        !!tableData.length
          ? stylingCell(tableData[rowIndex][cellIndex])
          : {
              bgcolor: "gray",
              border: "1px solid black",
              boxShadow: 5,
              borderRadius: 1,
              cursor: "pointer",
            }
      }
      onClick={() => {
        dispatch(SetMine([row, cell, rowIndex, cellIndex, isStop]));
      }}
    >
      {!!tableData.length ? printText(tableData[rowIndex][cellIndex]) : ""}
    </TableCell>
  );
}

export default Tc;
