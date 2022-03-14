import { Table, TableBody } from "@mui/material";
import { nanoid } from "nanoid";
import Tr from "./Tr";

function TableM({ level }) {
  const SetTr = () => {
    if (level === 10) {
      return (
        <TableBody>
          {Array(8)
            .fill()
            .map((el) => (
              <Tr key={nanoid()} row={8} cell={8} />
            ))}
        </TableBody>
      );
    } else if (level === 20) {
      return (
        <TableBody>
          {Array(16)
            .fill()
            .map((el) => (
              <Tr key={nanoid()} row={8} cell={16} />
            ))}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          {Array(16)
            .fill()
            .map((el) => (
              <Tr key={nanoid()} row={16} cell={32} />
            ))}
        </TableBody>
      );
    }
  };

  return <Table sx={{ width: 100, height: 100 }}>{SetTr(level)}</Table>;
}

export default TableM;
