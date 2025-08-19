import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 디자인 시스템 유틸리티 함수들

/**
 * 색상 팔레트 시스템
 */
export const colors = {
  primary: {
    50: 'hsl(var(--color-primary-50))',
    100: 'hsl(var(--color-primary-100))',
    200: 'hsl(var(--color-primary-200))',
    300: 'hsl(var(--color-primary-300))',
    400: 'hsl(var(--color-primary-400))',
    500: 'hsl(var(--color-primary-500))',
    600: 'hsl(var(--color-primary-600))',
    700: 'hsl(var(--color-primary-700))',
    800: 'hsl(var(--color-primary-800))',
    900: 'hsl(var(--color-primary-900))',
  },
  neutral: {
    50: 'hsl(var(--color-neutral-50))',
    100: 'hsl(var(--color-neutral-100))',
    200: 'hsl(var(--color-neutral-200))',
    300: 'hsl(var(--color-neutral-300))',
    400: 'hsl(var(--color-neutral-400))',
    500: 'hsl(var(--color-neutral-500))',
    600: 'hsl(var(--color-neutral-600))',
    700: 'hsl(var(--color-neutral-700))',
    800: 'hsl(var(--color-neutral-800))',
    900: 'hsl(var(--color-neutral-900))',
  },
  success: {
    50: 'hsl(var(--color-success-50))',
    100: 'hsl(var(--color-success-100))',
    500: 'hsl(var(--color-success-500))',
    600: 'hsl(var(--color-success-600))',
    700: 'hsl(var(--color-success-700))',
  },
  warning: {
    50: 'hsl(var(--color-warning-50))',
    100: 'hsl(var(--color-warning-100))',
    500: 'hsl(var(--color-warning-500))',
    600: 'hsl(var(--color-warning-600))',
    700: 'hsl(var(--color-warning-700))',
  },
  error: {
    50: 'hsl(var(--color-error-50))',
    100: 'hsl(var(--color-error-100))',
    500: 'hsl(var(--color-error-500))',
    600: 'hsl(var(--color-error-600))',
    700: 'hsl(var(--color-error-700))',
  },
} as const

/**
 * 타이포그래피 시스템
 */
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const

/**
 * 간격 시스템 (4px 단위 기반)
 */
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const

/**
 * 그림자 시스템
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const

/**
 * 테두리 반경 시스템
 */
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const

/**
 * 애니메이션 지속 시간 시스템
 */
export const durations = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const

/**
 * 애니메이션 이징 함수 시스템
 */
export const easings = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

/**
 * 반응형 브레이크포인트 시스템
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/**
 * Z-인덱스 시스템
 */
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

/**
 * 유틸리티 함수들
 */

/**
 * 색상 클래스 생성
 */
export function createColorClass(color: keyof typeof colors, shade: keyof typeof colors.primary) {
  return colors[color][shade]
}

/**
 * 간격 클래스 생성
 */
export function createSpacingClass(space: keyof typeof spacing) {
  return spacing[space]
}

/**
 * 타이포그래피 클래스 생성
 */
export function createTypographyClass(
  size: keyof typeof typography.fontSize,
  weight: keyof typeof typography.fontWeight = 'normal',
  lineHeight: keyof typeof typography.lineHeight = 'normal'
) {
  return `${typography.fontSize[size]} ${typography.fontWeight[weight]} ${typography.lineHeight[lineHeight]}`
}

/**
 * 그림자 클래스 생성
 */
export function createShadowClass(shadow: keyof typeof shadows) {
  return shadows[shadow]
}

/**
 * 반응형 클래스 생성
 */
export function createResponsiveClass(breakpoint: keyof typeof breakpoints, className: string) {
  return `${breakpoint}:${className}`
}
