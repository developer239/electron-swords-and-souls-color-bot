import robot from 'robotjs'


robot.setMouseDelay(1)
robot.setKeyboardDelay(1)

function Bot() {
  this.isPlaying = false
  this.queue = []

  this.getItemToPlay = () => this.queue.shift()

  this.getIsPlaying = () => this.isPlaying

  this.setIsPlaying = value => {
    this.isPlaying = value
  }

  this.addToQueue = callback => {
    this.queue.push({ callback })
  }

  this.addMoveMouse = point => {
    const callback = () => robot.moveMouse(point.x, point.y)
    this.addToQueue(callback)
  }

  this.addWait = ms => {
    this.queue.push({ type: 'wait', ms })
  }

  this.addClickLeft = () => {
    const callback = () => robot.mouseClick('left')
    this.addToQueue(callback)
  }

  this.addKeyTap = key => {
    const callback = () => robot.keyTap(key)
    this.addToQueue(callback)
  }

  this.isFinishedPlaying = () => !this.queue.length

  this.play = () => {
    if (this.isFinishedPlaying()) {
      this.setIsPlaying(false)
      return
    }
    this.setIsPlaying(true)
    const { type, ms, callback } = this.getItemToPlay()

    if (type === 'wait') {
      setTimeout(() => {
        this.play()
      }, ms)
    } else {
      callback() // eslint-disable-line
      this.play()
    }
  }
}

export default Bot
