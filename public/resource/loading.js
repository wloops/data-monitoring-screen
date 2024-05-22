function addThemeColorCssVars() {
  const key = '__THEME_COLOR__'
  const defaultColor = '#3987F8'
  // const themeColor = window.localStorage.getItem(key) || defaultColor
  const themeColor = defaultColor
  const cssVars = `--primary-color: ${themeColor}`
  document.documentElement.style.cssText = cssVars
}

addThemeColorCssVars()
