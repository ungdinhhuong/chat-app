import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = 'Asia/Ho_Chi_Minh';

export class TimeUtil {
  /**
   * Trả về thời gian hiện tại theo giờ Việt Nam
   */
  static nowVN(): Dayjs {
    return dayjs().tz(TIMEZONE);
  }

  /**
   * Trả về thời gian hiện tại theo UTC
   */
  static nowUTC(): Dayjs {
    return dayjs().utc();
  }

  /**
   * Format thời gian hiện tại theo giờ VN
   */
  static formatNowVN(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs().tz(TIMEZONE).format(format);
  }

  /**
   * Format một thời điểm bất kỳ sang giờ VN
   */
  static formatToVN(date: string | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(date).tz(TIMEZONE).format(format);
  }

  /**
   * Cộng thêm phút
   */
  static addMinutes(minutes: number): Date {
    return dayjs().tz(TIMEZONE).add(minutes, 'minute').toDate();
  }

  /**
   * Cộng thêm giờ
   */
  static addHours(hours: number): Date {
    return dayjs().tz(TIMEZONE).add(hours, 'hour').toDate();
  }

  /**
   * Cộng thêm ngày
   */
  static addDays(days: number): Date {
    return dayjs().tz(TIMEZONE).add(days, 'day').toDate();
  }

  /**
   * Kiểm tra một thời điểm đã hết hạn chưa
   */
  static isExpired(date: string | Date): boolean {
    return dayjs().isAfter(dayjs(date));
  }
}
