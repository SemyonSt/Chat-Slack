/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  setModalInfo: { type: null, item: null },
  channelId: 1,
  // newChannels: [],
};

const modalsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      const { type, item } = payload;
      state.setModalInfo.type = type;
      state.setModalInfo.item = item;
    },
    hideModal(state) {
      state.setModalInfo.type = null;
      state.setModalInfo.item = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
