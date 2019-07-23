$(function () {
  const socket = io.connect();
  //Get DOM Elements from index.html
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');
  //Get DOM Elements from nickForm
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nicknameWrap = $('#nicknameWrap');
  const $users = $('#usernames');

  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $nickName.val(), data => {
      if (data) {
        $('#nicknameWrap').hide();
        $('#contentWrap').show();
      } else {
        $nickError.html(`
          <div class="alert alert-danger">
          that username already exists
          </div>
          `);
      }
    });
    $nickname.val('');
  });
//Events
$messageForm.submit( e => {
  e.preventDefault();
  socket.emit('send message', $messageBox.val(), data => {
    $chat.append(`<p class="error">${data}</p>`)
  });
  $messageBox.val('');
});
socket.on('new message', data => {
  displayMsg(data);
});

socket.on('usernames', data => {
    let html = '';
    for(i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i>${data[i]}</p>`;
    }
    $users.html(html);
  });
  socket.on('private-message', data => {
    $chat.append(`<p class="private-message"><b>${data.nick}</b>:${data.msg}</p>`);
  });
  socket.on('load old msgs', data => {
    for (let i = data.length -1; i >=0 ; i--) {
      displayMsg(data[i]);
    }
  });
  function displayMsg(data) {
    $chat.append(`<p class="msg"><b>${data.nick}</b>:${data.msg}</p>`);
  }
});
