const ASCII_CHARS = "abcdefghijklmnñopqrstuvwxyz0123456789!#$%&/?'_-"
const COLORS = ["#ff6188", "#fc9867", "#ffd866", "#a9dc76", "#78dce8", "#ab9df2"]

class RainbowButton {
    constructor(_btn) {
        this.el = _btn
        this.txt = this.el.innerText
				this.overColor = COLORS[0]
        this.fps = 24
        this.events()
    }

    events() {
        this.el.addEventListener("mouseenter", () => this.onMouseEnter(), false)
        this.el.addEventListener("mouseleave", () => this.onMouseLeave(), false)
    }

    onMouseEnter() {
        this.over_active = true
        this.el.innerHTML = ""
        this.rainbow()
    }

    rainbow() {
        let letters = this.txt.split("")
        for (let i = 0; i < letters.length; i++) {
            const span = document.createElement("span")
            this.el.appendChild(span)
            const letter = letters[i]
						span.innerText = letter
            if (letter != " ") {
							let idx = ASCII_CHARS.indexOf(letter.toLowerCase())
							let initChar = idx > 10 ? ASCII_CHARS[idx - 9] : ASCII_CHARS[0]
							setTimeout(() => this.letterTo(span, initChar, letter), 60 * i)
						}
        }
    }

    onMouseLeave() {
        this.over_active = false
        this.el.innerHTML = this.txt
    }

    letterTo(span, from, to) {
        let char = to
        let color = this.overColor
        if (from != to.toLowerCase() && this.over_active) {
            const idx = ASCII_CHARS.indexOf(from.toLowerCase())
            color = COLORS[~~(Math.random() * COLORS.length)]
            char = Math.random() > .5 ? from : from.toUpperCase()
            setTimeout(() => this.letterTo(span, ASCII_CHARS[idx + 1], to), 1000 / this.fps)
        }
        span.style.color = color
        span.innerText = char
    }
}

const _btn = new RainbowButton(document.querySelector("#rainbow-btn"))