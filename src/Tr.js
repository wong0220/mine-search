import Tc from "./Tc";
import { nanoid } from "nanoid";
import { TableRow } from "@mui/material";

function Tr({ row, cell, rowIndex }) {
  return (
    <TableRow>
      {Array(cell)
        .fill()
        .map((el, idx) => (
          <Tc
            key={nanoid()}
            row={row}
            cell={cell}
            rowIndex={rowIndex}
            cellIndex={idx}
          />
        ))}
    </TableRow>
  );
}

export default Tr;
