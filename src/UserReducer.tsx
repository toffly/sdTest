import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";

const userSlice = createSlice({
  name: "users",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      const { key } = action.payload;
      const uu = state.find((user) => user.key == key);
      if (uu) {
        return state.filter((f) => f.key !== key);
      }
    },
    updateUser: (state, action) => {
      const {
        key,
        name,
        bday,
        national,
        cID,
        gender,
        pNumber,
        visa,
        eSalary,
      } = action.payload;
      const uu = state.find((user) => user.key == key);
      if (uu) {
        uu.name = name
        uu.bday = bday
        uu.national = national
        uu.cID = cID
        uu.gender = gender
        uu.pNumber = pNumber
        uu.visa = visa
        uu.eSalary = eSalary
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
