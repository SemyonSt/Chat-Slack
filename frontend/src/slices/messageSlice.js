import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.message = payload;
    },
    addMessage(state, { payload }) {
      state.message.push(payload);
    },
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
