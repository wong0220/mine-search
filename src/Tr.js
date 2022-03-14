import Tc from "./Tc";
import { nanoid } from "nanoid";
import { TableRow } from "@mui/material";

function Tr({ row, cell }) {
  return (
    <TableRow>
      {Array(cell)
        .fill()
        .map((el) => (
          <Tc key={nanoid()} row={row} cell={cell} />
        ))}
    </TableRow>
  );
}

export default Tr;
