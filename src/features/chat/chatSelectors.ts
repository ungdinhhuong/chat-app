import {RootState} from "@/store";

export const selectMessagesByRoom = (roomId: string) => (state: RootState) => (state.chat.messages[roomId] || []);

export const selectSelectedRoomId = (state: RootState) => state.chat.selectedRoomId;
