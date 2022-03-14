import { createSlice } from "@reduxjs/toolkit";
/*
상태값
0: 열린 상태
-1: 비어있지만 아직 열리지 않은 상태
-2: 지뢰가 숨어져있는 상태
-3: 지뢰를 밟은 상태
*/
const initialState = {
  level: "",
  tableData: [],
  stop: false,
};

const startGame = (row, cell, rowIndex, cellIndex) => {
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

    const bomb = number.splice(Math.floor(Math.random() * number.length), 1)[0];
    shuffle.push(bomb);
  }

  const data = [];

  for (let i = 0; i < row; i++) {
    // 난이도에 따라  지뢰찾기 2차원 배열 생성
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(-1);
    }
  }

  for (let i = 0; i < shuffle.length; i++) {
    //가로 인덱스와 세로 인덱스를 겹치지 않게 폭탄이 있는 다른 값들과 겹치지 않게 설정 후 data 변수에 폭탄 할당
    const width = Math.floor(shuffle[i] / cell);
    const height = shuffle[i] % cell;

    data[width][height] = -2;
  }

  data[rowIndex][cellIndex] = 0; // 첫 클릭한 부분은 지뢰칸이라면  0으로 초기화
  return data;
};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    SetLevel: (state, action) => {
      state.level = action.payload;
      state.tableData = [];
    },

    SetMine: (state, action) => {
      if (!action.payload[4]) {
        if (state.tableData.length === 0) {
          state.tableData = startGame(
            action.payload[0],
            action.payload[1],
            action.payload[2],
            action.payload[3]
          );
        } else {
          if (state.tableData[action.payload[2]][action.payload[3]] === -2) {
            state.tableData[action.payload[2]][action.payload[3]] = -3;
            state.stop = true;
          } else {
            state.tableData[action.payload[2]][action.payload[3]] = 0;
          }
        }
      } else {
        return;
      }
    },
  },
});

export const { SetLevel, SetMine } = mineSlice.actions;

export default mineSlice.reducer;
