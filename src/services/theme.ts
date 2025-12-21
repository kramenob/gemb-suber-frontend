/** Theme */
const STORAGE_KEY = 'theme'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle('dark', theme === 'dark')
}

function getSystemTheme(): Theme {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null

if (savedTheme) {
	applyTheme(savedTheme)
} else {
	applyTheme(getSystemTheme())
}

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (e) => {
		const savedTheme = localStorage.getItem(STORAGE_KEY)
		if (savedTheme) return

		applyTheme(e.matches ? 'dark' : 'light')
	})