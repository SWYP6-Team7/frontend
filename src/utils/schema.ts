import { z } from 'zod'

export const emailSchema = z
  .string()
  .email('이메일 주소를 정확하게 입력해주세요.')
export const passwordSchema = z
  .string()
  .min(8, '영문 대문자, 특수문자 포함 8~20자')
  .max(20, '영문 대문자, 특수문자 포함 8~20자')
  .refine(value => /[A-Z]/.test(value), '영문 대문자, 특수문자 포함 8~20자')
  .refine(
    value => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    '영문 대문자, 특수문자 포함 8~20자'
  )
