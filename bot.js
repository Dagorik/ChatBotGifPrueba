const Bootbot = require('bootbot');
const axios = require('axios');

const bot = new Bootbot({
    accessToken:"",
    verifyToken:"elbotdecintaroja23",
    appSecret:""
});

// bot.on('message',(payload,chat)=>{
//     console.log(payload);
//     chat.say("Hola humano")
// });


bot.hear(['hola','que onda','hey'],(payload,chat)=>{
    chat.say('Hola humano')
}) 

bot.hear(['adios','bye'],(payload,chat)=>{
    chat.say('Adios humano :(')
}) 

bot.hear(/gif (.*)/i, (payload,chat,data)=>{
    console.log(data.match[1])
    chat.say('Buscando unu gif chido de ' + data.match[1])
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${data.match[1]}&api_key=`)
    .then((result) => {
            chat.say({
                attachment:'image',
                url: result.data.data[0].images.fixed_height.url
            })
    }).catch((err) => {
        console.log(err)
        chat.say('No hay gif carnal :(')
    });
})

bot.start();