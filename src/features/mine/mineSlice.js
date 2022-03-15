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
  count: 0,
  isWin: false,
  mine: 5,
};

const startGame = (row, cell, mine) => {
  // 첫칸을 눌렀을 때 게임시작
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

  return data;
};

const SearchMine = (table, row, cell) => {
  let searchedMine = []; //클릭한 칸 주변 지뢰 갯수를 저장하는 변수

  // 맨 윗칸과 맨 아랫칸의 경우 양 옆칸의 지뢰만 계산
  if (table[row - 1]) {
    searchedMine = searchedMine.concat(
      table[row - 1][cell - 1],
      table[row - 1][cell],
      table[row - 1][cell + 1]
    );
  }

  searchedMine = searchedMine.concat(
    table[row][cell - 1],
    table[row][cell + 1]
  );

  if (table[row + 1]) {
    searchedMine = searchedMine.concat(
      table[row + 1][cell - 1],
      table[row + 1][cell],
      table[row + 1][cell + 1]
    );
  }
  const count = searchedMine.filter((el) => el === -2).length;

  table[row][cell] = count;
};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    SetLevel: (state, action) => {
      // 난이도 설정시 상태값 초기화
      state.level = action.payload;
      state.tableData = [];
      state.stop = false;
      state.count = 0;
      state.isWin = false;
    },

    SetMine: (state, action) => {
      if (!action.payload[4]) {
        // 게임 중단이 되지 않았을 경우에만 밑의 로직 실행

        if (state.tableData.length === 0) {
          // 게임시작 후 첫번째 칸을 클릭 시 지뢰 배치
          state.tableData = startGame(
            action.payload[0],
            action.payload[1],
            state.mine
          );
          state.count += 1;
          if (state.tableData[action.payload[2]][action.payload[3]] === -2) {
            state.mine = 4;
          }

          SearchMine(state.tableData, action.payload[2], action.payload[3]);
        } else {
          if (state.tableData[action.payload[2]][action.payload[3]] === -2) {
            state.tableData[action.payload[2]][action.payload[3]] = -3;
            state.stop = true;
          } else {
            if (state.tableData[action.payload[2]][action.payload[3]] === -1) {
              state.count += 1; // 열린 칸 수 카운트
              if (
                action.payload[0] * action.payload[1] - state.mine ===
                state.count
              ) {
                state.stop = true;
                state.isWin = true;
              }
            }

            SearchMine(state.tableData, action.payload[2], action.payload[3]);
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
