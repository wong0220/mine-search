import { Table, TableBody } from "@mui/material";
import { nanoid } from "nanoid";
import Tr from "./Tr";

function TableM({ level }) {
  const SetTr = () => {
    // 사용자가 설정한 난이도에 따른 테이블 크기 설정
    if (level === 10) {
      return (
        <TableBody>
          {Array(8)
            .fill()
            .map((el, idx) => (
              <Tr key={nanoid()} row={8} cell={8} rowIndex={idx} />
            ))}
        </TableBody>
      );
    } else if (level === 20) {
      return (
        <TableBody>
          {Array(16)
            .fill()
            .map((el, idx) => (
              <Tr key={nanoid()} row={16} cell={16} rowIndex={idx} />
            ))}
        </TableBody>
      );
    } else if (level === 30) {
      return (
        <TableBody>
          {Array(16)
            .fill()
            .map((el, idx) => (
              <Tr key={nanoid()} row={16} cell={32} rowIndex={idx} />
            ))}
        </TableBody>
      );
    } else {
      <></>;
    }
  };

  return <Table>{SetTr(level)}</Table>;
}

export default TableM;
