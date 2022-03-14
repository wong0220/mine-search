import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SetLevel } from "./features/mine/mineSlice";

function SelectBox() {
  const level = useSelector((state) => state.mine.level);
  const dispatch = useDispatch();

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Level</InputLabel>
        <Select
          value={level}
          label="Level"
          sx={{ width: 300 }}
          onChange={(event) => {
            dispatch(SetLevel(event.target.value));
          }}
        >
          <MenuItem value={10}>Beginner</MenuItem>
          <MenuItem value={20}>Intermediate</MenuItem>
          <MenuItem value={30}>Expert</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectBox;
