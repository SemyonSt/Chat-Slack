/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

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
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, actions) => {
      const channaelId = actions.payload.id;
      const rest = state.message.filter((i) => i.channelId !== channaelId);
      state.message = rest;
    });
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
