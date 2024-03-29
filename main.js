// # Otto
// Helps create elementary cellular automata

// Wrap index round edges
// http://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain
const myMod = (a, b) => a - (b * Math.floor(a / b))

// Rule to binary convert
const parseRule = (rule) => {
  // Base 2 digits
  const code = Number(rule).toString(2)

  const zeros = (1024).toString(2).split("").slice(1).join("")
  const zerosMax = zeros.length

  // No padding past 10
  const diff = Math.max(zerosMax, zerosMax - code.length)

  // Zero pad ruleset if need be
  return `${zeros}${code}`.substr(diff).split("").reverse()
}

// Master grid maker
export default function otto(data) {
  // Merge options and defaults
  const papa = Object.assign({
    size: 1,
    rule: 30,

    // How far from center lie the neighbors
    ends: [-1, 0, 1],

    // Flip middle cell
    seed: (_, i, view) => i === Math.floor(view.length * 0.5),

    // Index based lookup
    stat: (hood, code) => {
      const flags = hood.join("").toString(2)
      const stats = parseInt(flags, 2)

      return code[stats]
    },
  }, data)

  // Rule 90 would be
  // ```['0', '1', '0', '1', '1', '0', '1']```
  const code = parseRule(papa.rule)

  // Calculate state
  const step = (v, i, view) => {
    // Collect neighboring flags
    const hood = papa.ends.map((span) => {
      // The index for each neighbor
      const site = myMod(span + i, view.length)

      // The state of each neighbor
      return view[site]
    })

    return papa.stat(hood, code, v)
  }

  // Clipboard, zero filled
  let grid = new Uint8Array(papa.size)
  let next = papa.seed

  // Tick
  return () => {
    grid = grid.map(next)
    next = step

    return grid
  }
}
