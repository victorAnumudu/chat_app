import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobListTable: false,
  pendingListTable: false,
  myTaskTable: false,
  othersInterestedTable: false,
  couponTable: false,
  walletTable: false,
  uploadsTable: false,
};

export const tableReloadSlice = createSlice({
  name: "tableReload",
  initialState,
  reducers: {
    tableReload: (state, action) => {
      switch (action.payload.type) {
        case "JOBTABLE":
          state.jobListTable = !state.jobListTable;
          return;
        case "PENDINGTABLE":
          state.pendingListTable = !state.pendingListTable;
          return;
        case "MYTASKTABLE":
          state.myTaskTable = !state.myTaskTable;
          return;
        case "OTHERSINTERESTEDTABLE":
          state.othersInterestedTable = !state.othersInterestedTable;
          return;
        case "COUPONTABLE":
          state.couponTable = !state.couponTable;
          return;
        case "WALLETTABLE":
          state.walletTable = !state.walletTable;
          return;
        case "UPLOADSTABLE":
          state.uploadsTable = !state.uploadsTable;
          return;
        default:
          return state;
      }
    },
  },
});

export const { tableReload } = tableReloadSlice.actions;

export default tableReloadSlice.reducer;
