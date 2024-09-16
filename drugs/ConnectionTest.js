function PrimaryTest(socket){
    socket.on('firstConnectionTest', data => {
        data = parseInt(data);
        console.log('Client says:', data);
        // Отправка ответа обратно клиенту
        socket.emit('firstConnectionTestResp', (data + 1));
    });    
}

module.exports = {
    PrimaryTest
};
