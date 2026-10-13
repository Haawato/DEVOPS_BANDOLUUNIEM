export function createOrderReference() {
  return `DH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

export function currentDate() {
  return new Date().toISOString().slice(0, 10)
}