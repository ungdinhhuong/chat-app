import {RootState} from "@/store";
import {createSelector} from "@reduxjs/toolkit";

export const selectMessages = (state: RootState) => state.chat.messages;

export const selectMessagesByRoom = (roomId: string) =>
  createSelector(
    [selectMessages],
    (messages) => messages[roomId] || []
  );

export const selectSelectedRoomId = (state: RootState) => state.chat.selectedRoomId;
