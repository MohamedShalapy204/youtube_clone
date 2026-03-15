import { createSlice } from '@reduxjs/toolkit';

interface SideBarState {
  isSidebarOpen: boolean;
}

const initialState: SideBarState = {
  isSidebarOpen: false,
};

export const SideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = SideBarSlice.actions;

export default SideBarSlice.reducer;
