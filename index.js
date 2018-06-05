const Twit = require ('twit')
const auth = require ('./config')


//auth credentials
const T = new Twit(auth);

T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false,
},onAuthenticated)

function onAuthenticated(err, res){
    if(err){
        console.log(err)
    }
    console.log('Auth successful')
}



// response new follower with mention or DM

let stream = T.stream('user')
stream.on('follow',followed);


function followed (eventmsg){
    let name= eventmsg.source.name;
    let screenname =eventmsg.source.screen_name;

// tweetPost('.@' + screenname + ' Thanks for the follow!');
    T.post('direct_messages/new', {screen_name: screenname, text:'Thanks for the follow!'}, function(err,message, response){
      if(!err){
          console.log('Dm send to new follower')
      }
    })

}

//Auto Tweeting

function tweetPost(msg){
    let tweet ={
        status : msg
    }
    T.post('statuses/update', tweet, function (err, data){
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
}



//let tuits = [""]

var params = {
    screen_name: 'write_user',
    text: 'write_message'
};
function directmess(){
T.post('direct_messages/new', params, function(error, message, response) {
    if (!error) {
        console.log(message);
    }
});}



//Delete tweet - needs tweet id


function destroyer(){
T.post('statuses/destroy/:id', { id:'990096402142261249'}, function(err,data, response){
    if(!err){
        console.log(data)
    }
})}
destroyer()

// Auto tweets


function tuitea(){
    let arr = ["testing","twitter","bot","with","node","js","lel"]

T.post('statuses/update', { status: arr[Math.floor((Math.random()*arr.length))]}, function(err,data, response){
    console.log(data)
})}


T.get('search/tweets', { q: 'keyWord since:20015-06-04', count: 100 }, function(err, data, response) {
    for(var i=0;i<100;i++){
    console.log(i +"--//////---" + data.statuses[i].text +"---" + data.statuses[i].created_at+ "---/////----")}
})


//setInterval(function ,60000)



