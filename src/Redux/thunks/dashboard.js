import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBalance } from "./balance";
import { getChart } from "./graph";
import { getHistory } from "./history";


export const fetchDashboardData = createAsyncThunk('dashboard/fetchAll',
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(getBalance()),
      dispatch(getHistory()),
    ]);
  }
);
