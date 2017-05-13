var net = nodeRequire('net');
var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function (client) {
    client.name = client.remoteAddress + ':' + client.remotePort
    // client.write('Hi ' + client.name + '!\n');

    clientList.push(client)

    client.on('data', function (data) {
        // $("#running_log").append(data.toString());
        $('#running_log').append(html_encode(decodeUnicode(data.toString())));
        console.log(data.toString());
    })

    client.on('end', function () {
        clientList.splice(clientList.indexOf(client), 1); // 删除数组中的制定元素。这是 JS 基本功哦~  
    })

    client.on('error', function (e) {
        console.log(e);
    });
})

chatServer.listen(9000); 