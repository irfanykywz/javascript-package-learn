const TelegramBot = require('node-telegram-bot-api')

const token = 'BOT_TOKEN'

const mybot = new TelegramBot(token, {
    polling: true
})

// mybot.on('message', (callback) => {
//     const chatid = callback.from.id
//     mybot.sendMessage(chatid, "heheboi")
// })

const regex = /^hello$/
mybot.onText(regex, (callback) => {
    mybot.sendMessage(callback.from.id, `hallo ${callback.from.id}`)
})

const regex_gempa = /gempa/
mybot.onText(regex_gempa, async (callback) => {
    const ingfo_gempa = async () => {
        const API = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'

        const request = await fetch(API)
        const {Infogempa: {gempa} } = await request.json()
        console.log(gempa)
        console.log(gempa['Tanggal'])

        return `
Data Gempa Terbaru
Tanggal : ${gempa['Tanggal']}
Jam : ${gempa['Jam']}
Wilayah : ${gempa['Wilayah']}
Kedalaman : ${gempa['Kedalaman']}
        `
    }
    mybot.sendMessage(callback.from.id, await ingfo_gempa())
})

// reference
// https://www.youtube.com/watch?v=fUdW7qcEONc