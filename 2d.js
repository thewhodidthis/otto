// # Otto 2d
// Helps create CA grids

import otto from "./main.js"

export default function toto(from) {
  const size = (from && from.size) || 1
  const grid = { size: size * size }

  const data = Object.assign(
    {
      rule: 614,
      ends: [-1, 1, -size, size],
      stat: (hood, code, flag) => code[flag + (hood.reduce((a, b) => a + b) * 2)],
    },
    from,
    grid,
  )

  return otto(data)
}
