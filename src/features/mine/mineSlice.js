import { createSlice } from "@reduxjs/toolkit";
/*
상태값   * 양수의 경우에는 주변 지뢰의 갯수를 표현하는데 이용하므로 음수로 값 설정 *
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

  if (row * cell === 64) {
    // 난이도에 따른 지뢰 갯수 설정
    mine = 5;
  } else if (row * cell === 256) {
    mine = 15;
  } else {
    mine = 25;
  }

  const number = Array(row * cell) // 지뢰가 할당될 수 있는 배열 row*cell 길이만큼 생성
    .fill()
    .map((el, idx) => {
      return idx;
    });

  const shuffle = [];
  while (number.length > row * cell - mine) {
    // 전역상태에 설정된 지뢰 갯수만큼 배열에 랜덤값 할당

    const bomb = number.splice(Math.floor(Math.random() * number.length), 1)[0]; // 중복되는 값이 없도록 랜덤에 크기만큼 곱해주고 지뢰가 할당된 number 배열에서 값 제거
    shuffle.push(bomb);
  }

  const data = [];

  for (let i = 0; i < row; i++) {
    // 사용자가 설정한  난이도에 따라  지뢰찾기 2차원 배열 생성
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
  // 클릭한 칸 주변 8칸에 있는 지뢰의 갯수를 탐색하는 함수
  let searchedMine = []; //클릭한 칸 주변 상태값을 저장하는 변수

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

  const count = searchedMine.filter((el) => el === -2).length; // 상태값이 지뢰(-2)인 경우만  필터링

  table[row][cell] = count; // 필터링된 갯수를 선택한 테이블 인덱스에 할당
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
            // 첫 번째로 클릭한 칸이 지뢰가 배치됐던 칸이었을 경우 기존에 설정한 지뢰 갯수에서 -1
            state.mine = 4;
          }

          SearchMine(state.tableData, action.payload[2], action.payload[3]);
        } else {
          // 모든 지뢰가 배치됐을 경우 실행되는 로직

          if (state.tableData[action.payload[2]][action.payload[3]] === -2) {
            // 클릭한 칸이 지뢰였을 경우
            state.tableData[action.payload[2]][action.payload[3]] = -3;
            state.stop = true;
          } else {
            if (state.tableData[action.payload[2]][action.payload[3]] === -1) {
              // 비어있으며 열리지 않은 칸을 선택했을 경우
              state.count += 1; // 열린 칸 수 카운트

              if (
                // (모든 칸 수 - 배치된 지뢰 개수) === 열린 칸 수일 경우 승리,게임 종료
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
        // 게임이 종료되었다면 아무 동작도 하지 않으며 종료
        return;
      }
    },
  },
});

export const { SetLevel, SetMine } = mineSlice.actions;

export default mineSlice.reducer;
