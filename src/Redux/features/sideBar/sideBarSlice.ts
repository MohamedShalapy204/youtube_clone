import { createSlice } from '@reduxjs/toolkit';

interface SideBarState {
  isSidebarOpen: boolean;
  selectedCategory: string;
}

const initialState: SideBarState = {
  isSidebarOpen: true,
  selectedCategory: 'New',
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setSelectedCategory } = SideBarSlice.actions;

export default SideBarSlice.reducer;
