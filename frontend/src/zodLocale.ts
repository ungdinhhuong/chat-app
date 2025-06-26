import { z } from 'zod';

z.setErrorMap((issue, ctx) => {
  const messageMap: Record<string, string> = {
    invalid_type: 'Trường này không hợp lệ',
    required: 'Trường này là bắt buộc',
    too_small: 'Giá trị quá ngắn',
    too_big: 'Giá trị quá dài',
    invalid_string: 'Giá trị không hợp lệ',
    invalid_date: 'Ngày không hợp lệ',
    custom: 'Giá trị không hợp lệ',
    invalid_union: 'Không đúng định dạng yêu cầu',
    invalid_enum_value: 'Giá trị không hợp lệ',
    email: 'Email không hợp lệ',
  };

  const defaultMessage =
    messageMap[issue.code] || ctx.defaultError;

  return { message: defaultMessage };
});
