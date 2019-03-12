const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
const client = new Discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

client.once('ready', () => {
    console.log('Ready!') // displays this message on the console if the bot is up and running
})

client.on('message', message => {   
    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){ //check if user has real discord permissions
    
    if(message.content.startsWith(`${prefix}kick`)){ // if the entered command is !kick
    
    let member = message.mentions.members.first(); // will look for a mentioned member inside the msg 
    member.kick().then((member) => { // kicks the mentioned member and then does aaall this..

        giphy.search('gifs', {"q": "fail"}) // look for 'fail' gifs in the giphy api
            .then((response) => {
                var totalResponses = response.data.length; // amount of gifs
                var responseIndex = Math.floor((Math.random() * 10) +1) % totalResponses; // makes sure the gifs  are randomized 
                var responseFinal = response.data[responseIndex]; // chosen gif
                
                message.channel.send(":wave: " + member.displayName + " has been kicked!", { // bot will send an emoji, the kicked member's name and the rest of the message
                    files: [responseFinal.images.fixed_height.url] // object which is the gif file
                })
            }).catch(() => {
                message.channel.send('Error ugh!'); //catch any possible errors
            })          
       })
      }
    }
})

client.login(token);