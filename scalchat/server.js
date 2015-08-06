/**
 * Created by tefino on 2014/10/27.
 */
var compression = require("compression");
var fs = require("fs");
var url = require('url');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(3000);
var log4js = require('log4js');
var formidable = require('formidable');
var logger = log4js.getLogger('normal');
var oneDay = 86400000;
log4js.configure({
    appenders: [
//        {type: 'console'},
        {
            type: 'file',
            filename: 'logs/access.log',
            "pattern": "debug/yyyyMMddhh.txt",
            "alwaysIncludePattern": true,
            maxLogSize: 1024,
            backups: 0,
            category: 'normal'
        }
    ]
});
logger.setLevel("ERROR");
app.use(log4js.connectLogger(logger, {level: 'auto', format: ':method :url'}));
process.on('uncaughtException', function (err) {
//    console.log(err);
    logger.error(err);
});
exports.startServer = function () {
//    server.listen(3000);      //liston on 3000 port
//    app.use(compression());  //do the compression
//    app.use("/resources", express.static(__dirname + '/webcontent/resources/', {maxAge: oneDay}));
//    app.request() ;
//    app.get('/', function (req, res) {    //accept all kinds of request
////        var soap = require('soap');
////        var url = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';
////        var args = {byProvinceName: 'value'};
////        soap.createClient(url, function(err, client) {
////            client.getSupportProvince({}, function(err, result) {
////                console.log(result);
////            });
////        });
//
//        fs.readFile(__dirname + '/webcontent/views/home.html', "utf-8", function (err, data) {
//            //console.log(data);
//            if (err) {
//                res.send("server error");
////                    console.log(err);
//                logger.error(err);
//            } else {
//                res.send(data);
//                //console.log("test");
//            }
//        });
//    });
//
//
//    app.post('/upload', function (req, res) {
//        var form = new formidable.IncomingForm();
//        form.keepExtensions = true;
//        form.parse(req, function (err, fields, files) {
//            try {
////                console.log(req) ;
//                console.log(fields);
////                res.send("<script>alert('okay');window.parent.closeSlide();</script>");
//            }
//            catch (err) {
//                console.log(err);
//                fs.unlink(files.image.path, function (deleteErr) {
//                    if (deleteErr) logger.error(deleteErr);
//                });
//                res.send("<script>alert('" + err + "');</script>");
//            }
//        });
//    });
//    app.post("/chat",function(req, res){
//        var form = new formidable.IncomingForm();
//        form.keepExtensions = true;
//        form.parse(req, function (err, fields, files) {
//            try {
////                console.log(req) ;
//                console.log(fields);
//                fs.readFile(__dirname + '/webcontent/views/chatpage.html', "utf-8", function (err, data) {
//                    //console.log(data);
//                    if (err) {
//                        res.send({"code":"-1","content":"server error"});
////                    console.log(err);
//                        logger.error(err);
//                    } else {
//                        res.send({"code":"1","content":data});
//                        //console.log("test");
//                    }
//                });
////                res.send("<script>alert('okay');window.parent.closeSlide();</script>");
//            }
//            catch (err) {
//                console.log(err);
//                //fs.unlink(files.image.path, function (deleteErr) {
//                //    if (deleteErr) logger.error(deleteErr);
//                //});
//                //res.send("<script>alert('" + err + "');</script>");
//            }
//        });
//    }) ;
//    "{\"msgid\":0,\"fromid\":\"010660\",\"toid\":\"010661\",\"type\":\"text\",\"content\":\"hello world\",\"time\":\"2015-02-04 13:12:16.379\",\"state\":\"sent\"}"
//    ype\":\"text\",\"content\":\"hello world\",\"time\":\"2015-02-04 13:12:16.379\",\"state\":\"sent\"}"

    //var data = {
    //    "id":"010661",
    //    "name":"唐霏",
    //    "deviceToken":"ae7175a5d1493daaf83090fd3cd14ee867cc66f43a5277d7ed807548c7205275",
    //    "deviceType":"iOS",
    //    "logTime":"2015-02-04 13:12:16"
    //}
    //
    //var needle = require('needle');
    //needle.
    //    post('http://172.18.19.72:8111/pushserver/userdevice/set',
    //    data, {json: true, headers:{'Content-Type':"application/json; charset=utf-8",accept:'text/plain'}}, function (err, resp) {
    //        console.log(resp.body);
    //    });

    console.log("server started at port 3000:::::::");
    io.set('log level', 1);
    //io.set('authorization', function (handshakeData, accept) {
    //
    //    console.log(handshakeData.query) ;
    //    return accept(null, true) ;
    //    //accept(null, true);
    //});
    io.on("connection", function (socket) {
        console.log("connected");
        //console.log(socket) ;
        require("./socketIO.js").socketIO(socket);
    })
    io.on("ack", function (socket) {
        console.on(socket) ;
    })
    io.on("unread_messages", function(socket){
        console.log("unread_messages") ;
    })

}
