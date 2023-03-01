import otto from "./main.js"
import toto from "./2d.js"

const plots = document.getElementsByTagName("canvas")
const items = document.getElementsByTagName("span")

const frames = []
const rules = [99, 451, 988197457, 497, 184, 473]

const ends = [-2, -1, 0, 1, 2]
const seed = () => Math.random() > 0.5
const size = 180

let frameId = -1

const draw = () => {
  frames.forEach((next, i) => {
    const plot = plots[i].getContext("2d")
    const rule = rules[i]

    const data = next()

    if (i % 2 === 0) {
      const fill = ["#fff", "#000"]

      if (rule < 100) {
        fill.reverse()
      }

      data.forEach((v, j) => {
        const x = j % size
        const y = frameId - 1

        plot.fillStyle = fill[v]
        plot.fillRect(x, y, 1, 1)
      })
    } else {
      const s = 119
      const d = Math.ceil(s * 0.5)

      if (frameId > d) {
        return
      }

      if (frameId % 4 === 0) {
        data.forEach((v, j) => {
          const x = j % s
          const y = Math.floor(j / s)

          plot.fillStyle = v ? "#000" : "#fff"
          plot.fillRect(x + 30, y + 30, 1, 1)
        })
      }
    }
  })

  if (frameId < size) {
    frameId = self.requestAnimationFrame(draw)
  }
}

rules.forEach((rule, i) => {
  const item = items[i]

  item.setAttribute("title", rule)

  if (i % 2 === 0) {
    const data = { rule, size }

    if (rule > 100) {
      data.seed = seed
    }

    if (rule > 256) {
      data.ends = ends
    }

    frames.push(otto(data))
  } else {
    frames.push(toto({ rule, size: 119 }))
  }
})

frameId = self.requestAnimationFrame(draw)
