var net = nodeRequire('net');
var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function (client) {
    client.name = client.remoteAddress + ':' + client.remotePort
    // client.write('Hi ' + client.name + '!\n');

    clientList.push(client)

    client.on('data', function (data) {
        // $("#running_log").append(data.toString());
        var message = data.toString();
        var message_type = message[0];
        var message_data = message.substring(1);

        if (message_type == 'l') {
            $('#running_log').append(html_encode(decodeUnicode(message_data)));
        } else if (message_type == 'k') {
            $('#running-status-bar-current-keyword').text(message_data);
        } else if (message_type == 's') {
            if (message_data == 'PASS') {
                $('#running-status-bar-pass').text(++pass_count);
            } else {
                $('#running-status-bar-fail').text(++fail_count);
            }

            if (fail_count == 0) {
                $("#running-status-bar").attr("class",function (index, oldClass) {
                    return oldClass.replace(/mdui-color-(.*?) /, 'mdui-color-green-300 ');
                });
            } else {
                $("#running-status-bar").attr("class",function (index, oldClass) {
                    return oldClass.replace(/mdui-color-(.*?) /, 'mdui-color-red-300 ');
                });
            }


        }

        console.log(message_type, message_data);
    })

    client.on('end', function () {
        clientList.splice(clientList.indexOf(client), 1);
    })

    client.on('error', function (e) {
        console.log(e);
    });
})

chatServer.listen(9000); 