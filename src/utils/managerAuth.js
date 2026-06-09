const KEY = 'mgr_pin'

export const hasManagerAccess = () => !!localStorage.getItem(KEY)
export const setManagerPin = (pin) => localStorage.setItem(KEY, pin)
export const clearManagerPin = () => localStorage.removeItem(KEY)
