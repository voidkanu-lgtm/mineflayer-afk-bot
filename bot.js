const express = require('express')
const mineflayer = require('mineflayer')

const app = express()

// WEB SERVER FOR RENDER
app.get('/', (req, res) => {
  res.send('Minecraft AFK Bot is running!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running!')
})

// BOT SETTINGS
const config = {
  host: 'deadlymc.aternos.me',
  port: 61908,
  username: 'RICHRICH',
  version: false
}

// PASSWORD
const password = '123456'

function createBot() {

  const bot = mineflayer.createBot(config)

  bot.on('login', () => {
    console.log('Bot joined server!')
  })

  bot.on('spawn', () => {

    console.log('Bot spawned!')

    // AUTO REGISTER + LOGIN
    setTimeout(() => {

      bot.chat(`/register ${password} ${password}`)
      console.log('Register command sent')

      setTimeout(() => {

        bot.chat(`/login ${password}`)
        console.log('Login command sent')

      }, 3000)

    }, 5000)

    // ANTI AFK MOVEMENT
    setInterval(() => {

      const actions = ['forward', 'back', 'left', 'right']

      const randomAction =
        actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(randomAction, true)

      // RANDOM JUMP
      if (Math.random() > 0.5) {
        bot.setControlState('jump', true)
      }

      setTimeout(() => {

        bot.setControlState(randomAction, false)
        bot.setControlState('jump', false)

      }, 1000)

    }, 5000)

  })

  // KICK MESSAGE
  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  // AUTO RECONNECT
  bot.on('end', () => {

    console.log('Disconnected! Reconnecting in 10 sec...')

    setTimeout(() => {
      createBot()
    }, 10000)

  })

  // ERROR
  bot.on('error', (err) => {
    console.log('Error:', err.message)
  })
}

createBot()
