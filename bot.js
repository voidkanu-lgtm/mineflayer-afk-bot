const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot is running')
})

app.listen(3000, () => {
  console.log('Web server running!')
})
const mineflayer = require('mineflayer')

const config = {
  host: 'deadlymc.aternos.me',
  port: 61908,
  username: 'AFK_Bot',
  version: false
}

// PASSWORD YAHAN DAAL
const password = '123456'

function createBot() {

  const bot = mineflayer.createBot(config)

  bot.on('login', () => {
    console.log('Bot joined server!')
  })

  bot.on('spawn', () => {

    console.log('Bot spawned!')

    // REGISTER + LOGIN
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

      // Kabhi kabhi jump bhi kare
      if (Math.random() > 0.5) {
        bot.setControlState('jump', true)
      }

      setTimeout(() => {

        bot.setControlState(randomAction, false)
        bot.setControlState('jump', false)

      }, 1000)

    }, 5000)

  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  bot.on('end', () => {

    console.log('Disconnected! Reconnecting in 10 sec...')

    setTimeout(() => {
      createBot()
    }, 10000)

  })

  bot.on('error', (err) => {
    console.log('Error:', err.message)
  })
}

createBot()
