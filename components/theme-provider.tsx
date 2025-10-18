"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      storageKey="madaden-theme"
      enableSystem={false}
      disableTransitionOnChange={false}
      enableColorScheme={false}
    >
      {children}
    </NextThemesProvider>
  )
}
