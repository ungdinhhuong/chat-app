import {differenceInMinutes, format, isSameDay, isToday, isYesterday, parseISO} from 'date-fns';
import { MessageRedux } from '@/features/chat/types/message.type';

export interface MessageGroup {
  senderId: string;
  senderName: string;
  created: string;
  messages: MessageRedux[];
}

export const groupMessages = (messages: MessageRedux[]): MessageGroup[] => {
  if (!messages.length) return [];

  const result: MessageGroup[] = [];
  let currentGroup: MessageGroup = {
    senderId: messages[0].sender?.id as string,
    senderName: messages[0].sender?.username as string,
    created: messages[0].created,
    messages: [messages[0]],
  };

  for (let i = 1; i < messages.length; i++) {
    const prev = messages[i - 1];
    const curr = messages[i];

    const sameSender = curr.sender?.id === prev.sender?.id;
    const sameDay = isSameDay(parseISO(curr.created), parseISO(prev.created));
    const within5Min = differenceInMinutes(parseISO(curr.created), parseISO(prev.created)) <= 5;

    if (sameSender && sameDay && within5Min) {
      currentGroup.messages.push(curr);
    } else {
      result.push(currentGroup);
      currentGroup = {
        senderId: curr.sender?.id as string,
        senderName: curr.sender?.username as string,
        created: curr.created,
        messages: [curr],
      };
    }
  }

  result.push(currentGroup);
  return result;
};

export interface GroupByDay {
  dateLabel: string;
  groups: MessageGroup[];
}

export const groupMessagesByDay = (messages: MessageRedux[]): GroupByDay[] => {
  const grouped = groupMessages(messages);
  const result: GroupByDay[] = [];

  for (const group of grouped) {
    const date = parseISO(group.created);
    let label = format(date, 'dd/MM/yyyy');
    if (isToday(date)) label = 'Hôm nay';
    else if (isYesterday(date)) label = 'Hôm qua';

    const found = result.find((r) => r.dateLabel === label);
    if (found) {
      found.groups.push(group);
    } else {
      result.push({ dateLabel: label, groups: [group] });
    }
  }

  return result;
};
