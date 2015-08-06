/**
 * Created by leotang on 2/15/15.
 */
var needle = require("needle") ;
var header = {'Content-Type':"application/json; charset=utf-8",accept:'text/plain'}
var config = require("./config.js") ;
var storeDeviceTokenAddress = config.PSA+'/pushserver/userdevice/setdevice' ;
var pushMessageAddress = config.PSA+'/pushserver/push' ;
var getUnreadMessageAddress = config.DSA+'/scalchat/message/getnewmsgs?uid=' ;
var setUnreadMessageAddress = config.DSA+'/scalchat/message/setreadmsgs' ;
var saveMessageAddress = config.DSA+'/scalchat/message/savemsg';
exports.storeiOSDeviceToken = function (data) {
    needle.
        post(storeDeviceTokenAddress,
        data, {json: true, headers:header}, function (err, resp) {
            //console.log(resp.body);
        });
}
exports.storeAndroidDeviceToken = function (data) {
    needle.
        post(storeDeviceTokenAddress,
        data, {json: true, headers:header}, function (err, resp) {
            //console.log(resp.body);
        });
}
exports.pushMessage = function (data){
    //var pushParameter = {"toID":data.toID, "fromName": data.fromName}
    needle.post(pushMessageAddress, {"toID":data.toID, "fromName": data.fromName}, {json: true, headers:header}, function (err, resp){
        console.log(resp.body) ;
    }) ;
}
exports.saveMessageToDB = function (data, isRead) {
    data["fromState"] = "sent" ;
    data["toState"] = isRead ;
    needle.post(saveMessageAddress, data, {json:true, headers: header}, function (err, resp) {
        console.log(resp.body) ;
    }) ;

}
exports.getUnreadMessage = function (uid, socket){
    needle.get(getUnreadMessageAddress+uid, function(error, resp) {
        //console.log(resp.body) ;
        if (resp.body.newMessages.length != 0 && resp.body.newMessages != undefined) {
            socket.emit("unread_messages", resp.body.newMessages, function (d) {//this function is a ack function, arguement is sent by client
                var unreadMessages = {};
                unreadMessages.readMessages = resp.body.newMessages;
                //console.log(unreadMessages);
                needle.
                    post(setUnreadMessageAddress,
                    unreadMessages, {json: true, headers: header}, function (err, res) {
                        console.log(res.body);
                    });
                /*for (var i = 0; i < resp.body.length; i++) {
                    console.log(resp.body.newMessages[i].msgID);
                    //delete resp.body[i].messageType ;//delete key value pair
                }*/
                console.log(resp.body.newMessages);
                console.log(d);
                resp = null ;
            });
        }
    });
}
//var data = {
//    "id":"010661",
//    "name":"唐霏",
//    "deviceToken":"ae7175a5d1493daaf83090fd3cd14ee867cc66f43a5277d7ed807548c7205275",
//    "deviceType":"iOS",
//    "logTime":"2015-02-04 13:12:16"
//}


