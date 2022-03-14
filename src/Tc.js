import { TableCell } from "@mui/material";

function Tc({ row, cell }) {
  const startGame = (row, cell) => {
    // 첫칸을 눌렀을 때 게임시작
    let mine = 5;
    const number = Array(row * cell) // 폭탄이 할당될 수 있는 배열 생성
      .fill()
      .map((el, idx) => {
        return idx;
      });

    const shuffle = [];
    while (number.length > row * cell - mine) {
      // 설정한 폭탄 갯수만큼 배열에 랜덤값 할당

      const bomb = number.splice(
        Math.floor(Math.random() * number.length),
        1
      )[0];
      shuffle.push(bomb);
    }

    const data = [];

    for (let i = 0; i < row; i++) {
      // 난이도에 따라  지뢰찾기 2차원 배열 생성
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(0);
      }
    }

    for (let i = 0; i < shuffle.length; i++) {
      //가로 인덱스와 세로 인덱스를 겹치지 않게 폭탄이 있는 다른 값들과 겹치지 않게 설정 후 data 변수에 폭탄 할당
      const width = Math.floor(shuffle[i] / cell);
      const height = shuffle[i] % cell;

      data[width][height] = -1;
    }

    console.log(data);
  };

  return (
    <TableCell
      sx={{
        p: "10px",
        bgcolor: "gray",
        border: "1px solid black",
        boxShadow: 5,
        borderRadius: 1,
        cursor: "pointer",
      }}
      onClick={() => {
        startGame(row, cell);
      }}
    ></TableCell>
  );
}

export default Tc;
