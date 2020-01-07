var CONNECTION;
var mine;
var msgid;
layui.use(['layim'], function () {
    var layim = layui.layim;
    var utoken = $.cookie("utoken");
    // 获取用户信息
    if (utoken == "null") {
        window.location.href = "../../../login.html"
    }
    access_token = JSON.parse(utoken).access_token;
    var roleInfoUlr = AJAX_API.user.userInfo;
    ajaxRequest(roleInfoUlr, "get", {}, access_token, function (res) {
        if (res.code == 200) {
            var data = res.data;
            $("#username").html(data.role)
            $("#department").html(data.department)
            $("#hospital").html(data.hospital)
            if (data.avatar) {
                $(".avatar").html(data.avatar)
            }
            mine = {
                username: data.realname,
                avatar: data.avatar,
                id: data.mobile + "@xyim.com",
                mine: true
            };
            var server = AJAX_API.im.server;
            var friend = [];
            var group = [
                {
                    groupname: "糖足患者",
                    id: "cb1d140e9faf4b71bd1d7e468ddcbc56",
                    avatar: data.avatar
                }
            ];
            var password = "123456";
            var connected = false;
            var gropuListURL = AJAX_API.im.roomid;
            ajaxRequest(gropuListURL, "get", {}, access_token, function (_res) {
                if(_res.code ==200) {
                    var rooms = _res.data
                    
                    var layimGroup = [];
                    $.each(rooms,function(i,room) {
                        layimGroup.push({
                            groupname: room.realname,
                            id: room.roomid.split("@")[0],
                            avatar: data.avatar,
                            cardno: room.cardno
                        })
                    })
                    CONNECTION = new Strophe.Connection(server);
                    var CONNECT = CONNECTION.connect(mine.id, password, CONNECTstatus)
                    function CONNECTstatus(status) {
                        if (status == Strophe.Status.CONNFAIL) {
                            console.log("连接失败！");
                        } else if (status == Strophe.Status.AUTHFAIL) {
                            console.log("登录失败！");
                        } else if (status == Strophe.Status.DISCONNECTED) {
                            console.log("连接断开！");
                            connected = false;
                        } else if (status == Strophe.Status.CONNECTED) {
                            console.log("连接成功！");
                            connected = true;
                            var iq = $iq({ type: 'get' }).c('query', { xmlns: 'jabber:iq:roster' });
                            CONNECTION.sendIQ(iq, function (a) {
                                $(a).find('item').each(function (i, item) {
                                    var jid = $(this).attr('jid'); // jid
                                    var username = $(this).attr('name');
                                    friend.push({
                                        username: username,
                                        id: username,
                                        avatar: "../../imgs/user.png", //好友头像
                                        sign: "这些都是测试数据，实际使用请严格按照该格式返回", //好友签名
                                        status: "online" //若值为offline代表离线，online或者不填为在线
                                    })
                                });
                                layim.config({
                                    init: {
                                        mine: mine,
                                        friend: [
                                            {
                                                "groupname": "智足管家",
                                                "id": 0,
                                                "list": friend
                                            }
        
                                        ],
                                        group: layimGroup
        
                                    }
                                    , title: "智足管家IM"
                                    //获取群员接口（返回的数据格式见下文）
                                    // , members: {
                                    //     url: '../../json/im/getMembers.json' //接口地址（返回的数据格式见下文）
                                    //     , type: 'get' //默认get，一般可不填
                                    //     , data: {} //额外参数
                                    // }
        
                                    //上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
                                    , uploadImage: {
                                        url: ajaxRoot + AJAX_API.upImg.updata //接口地址
                                        , type: 'get' //默认post
                                        , cb: sendUplaod
                                    }
                                    ,tool:[]
                                    ,isface:false
                                    //上传文件接口（返回的数据格式见下文），若不开启文件上传，剔除该项即可
                                    // , uploadFile: {
                                    //     url: '' //接口地址
                                    //     , type: 'post' //默认post
                                    // }
                                    ,notice:true
                                    // , msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
                                    // , find: layui.cache.dir + 'css/modules/layim/html/myfind.html' //发现页面地址，若不开启，剔除该项即可
                                    // , chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html' //聊天记录页面地址，若不开启，剔除该项即可
                                });
                                layim.on('sendMessage', function (res) {
                                    var to = res.to;
                                    var mine = res.mine;
                                    var type = to.type == "friend" ? "chat" : "groupchat";
                                    var data = mine.content;
                                    var sendData = {}
                                    var arr = data.split("[");
                                    if (arr.length > 1) {
                                        if (arr[0] == "img") {
                                            sendData.type = 2;
                                            sendData.image = arr[1].split("]")[0];
                                            sendData.thumb = arr[1].split("]")[0];
        
                                        } else if (arr[0] == "audio") {
                                            sendData.type = 3;
                                            sendData.voice = arr[1].split("]")[0];
        
                                        } else if (arr[0] == "video") {
                                            sendData.type = 4;
                                            sendData.video = arr[1].split("]")[0];
        
                                        }
                                    } else {
                                        sendData.type = 1;
                                        sendData.text = data
                                    }
                                    // 发送消息
                                    var tojid = to.id + AJAX_API.im.domaian;
                                    sendMessage(mine.id, tojid, type, JSON.stringify(sendData), CONNECTION)
                                })
        
                                // 首先要发送一个<presence>给服务器（initial presence）
                                CONNECTION.send($pres().tree());
        
                            });
                            // 当接收到<message>节，调用onMessage回调函数
                            CONNECTION.addHandler(onMessage, null, 'message', null, null, null);
        
        
                            function onMessage(msg) {
                                var from = msg.getAttribute('from');  // 发送到
                                var to = msg.getAttribute('to');     // 发送者
                                var type = (msg.getAttribute('type')) == "chat" ? "friend" : "group";   // 类型
                                var body = msg.getElementsByTagName('body')
                                var mid =  msg.getAttribute('id'); 
                                
                                if (body.length > 0) {
                                    var msgObj = JSON.parse(body[0].innerHTML);
                                    var str = ""
                                    if (msgObj.type == 1) {
                                        str = msgObj.text;
                                    } else if (msgObj.type == 2) {
                                        str = "img[" + msgObj.thumbnail + "]"
                                    } else {
        
                                    }
                                    
                                    var laymsgId = from.split("@")[0];    // 发送的群
                                    var username = from.split("/")[1];   // 发送者
                                    if(username) {
                                        var obj = {
                                            username: username
                                            , avatar: "//tva3.sinaimg.cn/crop.0.0.180.180.180/7f5f6861jw1e8qgp5bmzyj2050050aa8.jpg"
                                            , id: laymsgId
                                            , type: "group"
                                            , content: str
                                            , mine: false
                                        }
                                        if(username == mine.id.split("@")[0]) {
                                            obj.mine = true
                                        }
                                        if(mid!= msgid) {
                                            layim.getMessage(obj)
                                        }
                                        msgid = mid;
                                    }
                                    
                                    
                                }
                                return true;
                            }
        
        
        
                        }
                    }

                }
            })
            
        }
    })
})


function sendMessage(jid, tojid, chatType, sendData, CONNECTION) {
    // return false
    if (chatType == "chat") {
        // 单聊
        var msg = $msg({
            to: tojid,
            from: jid,
            type: chatType
        }).c("body", null, sendData);
        CONNECTION.send(msg.tree());

    } else if (chatType == "groupchat") {
       
        // 群聊
        var msg = $msg({
            to: tojid.split("@")[0] + "@muc.xyim.com/",
            from: jid,
            type: 'groupchat'
           
        }).c("body", null, sendData);
        CONNECTION.send(msg.tree());
    }


}

function sendUplaod(res) {
    // console.log(res)
}
function addFriend(tid) {
    var to = tid + AJAX_API.im.domaian
    CONNECTION.send($pres({
        to: to,
        type: "subscribed"
    }));
}

function handleAddFriend() {

}

function enterRoom(jid, RID) {
    var toRID = RID + "@muc.xyim.com/" + jid.substring(0, jid.indexOf("@"))
    console.log(RID)
    CONNECTION.send($pres({
        from: jid,
        to: toRID
    }).c('x', { xmlns: 'http://jabber.org/protocol/muc' }).tree());

}
