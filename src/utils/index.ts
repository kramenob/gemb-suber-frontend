

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
	value: number,
	withCurrency: boolean = true
): string {
	return new Intl.NumberFormat('ru-RU', withCurrency
		? {
				style: 'currency',
				currency: 'RUB',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}
		: {
				style: 'decimal',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}
	).format(value)
}