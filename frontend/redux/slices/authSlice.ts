import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserDetails } from "@/interface";



interface UserState {
  user: UserDetails | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDetails>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
