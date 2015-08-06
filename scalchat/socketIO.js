/**
 * Created by tefino on 14-11-28.
 */

var onlineClient = require("./globalData.js").onlineClient;
var webservice = require("./webservice.js");

exports.socketIO = function (socket) {
    //console.log(socket);
    socket.on("message_sent", function (msg) {
        console.log("message_sent:");
        console.log(msg);
        //console.log(require("./globalData.js").onlineClient[msg.id]) ;
        //console.log(socket.chatterID) ;
        //console.log(onlineClient[msg.remoteID]) ;
        if (msg.toID in onlineClient) {
            onlineClient[msg.toID].emit("message_received", msg);
            webservice.saveMessageToDB(msg, "read");
        }
        else {
            //send notification
            webservice.saveMessageToDB(msg, "notread");
            webservice.pushMessage(msg);
            console.log("not online");
        }
    });
    socket.on("user_register", function (msg, fn) {
        try {
            console.log("user_register:");
            console.log(msg);
            onlineClient[msg.id] = socket;
            socket.chatterID = msg.id;
            webservice.getUnreadMessage(msg.id, socket);
            console.log("id is:" + msg.id);
            fn({"ack": "what the fuck"});
        } catch (e) {
            console.log(e.message);
        }

    });
//socket.on("user_login", function (msg, fn) {
//    try{
//        onlineClient[msg.id] = socket ;
//        onlineClient[msg.id]["isOnline"] = true ;
//        console.log(msg.id+" login") ;
//    }catch (e) {
//        console.log(e.message) ;
//    }
//}) ;
//socket.on("user_logout", function (msg, fn) {
//    try{
//        if(msg.id in onlineClient){
//            onlineClient[msg.id]["isOnline"] = false ;
//        }
//    }catch (e){
//        console.log(e) ;
//    }
//})
    socket.on("iOSDevice_Register", function (msg) {
        console.log("iOSDevice_Register:");
        webservice.storeiOSDeviceToken(msg);
        console.log(msg);
    });
    socket.on('disconnect', function (data) {
        console.log("disconnected:");
        console.log(data);
        var chatterID = socket.chatterID;
        console.log(chatterID);
        delete onlineClient[chatterID];
    });
    socket.on('connect', function (data) {
        console.log("connect:");
        console.log(data);
    })

    socket.on('message', function (data) {
        console.log("message:");
        console.log(data);
    })

    //安卓


    socket.on("androidDevice_Register", function (msg) {
        console.log("androidDevice_Register:");
        webservice.storeAndroidDeviceToken(msg);
        console.log(msg);
    });




}
