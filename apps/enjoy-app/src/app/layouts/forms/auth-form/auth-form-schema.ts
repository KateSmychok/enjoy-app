import * as yup from 'yup';
import { AuthUserDto } from '@generated/models';

export const authSchema = yup
  .object()
  .shape<Record<keyof AuthUserDto, yup.AnySchema>>({
    email: yup
      .string()
      .email('Please input a valid email')
      .required('The field is required'),
    password: yup.string().required('The field is required'),
  });
