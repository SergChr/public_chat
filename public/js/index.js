window.onload = () => {

    const chatBox = document.querySelector(".chat-box");
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        clientHeight = w.innerHeight || e.clientHeight || g.clientHeight;

    chatBox.style.height = (clientHeight * 0.6) + "px";
    // end design

    const sendButton = document.getElementById("sendButton"),
          usernameInp = document.getElementById("username"),
          messageInp = document.getElementById("message");
    sendButton.onclick = () => {
        let data = JSON.stringify({
            username: usernameInp.value,
            message: messageInp.value
        });
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/posts/create', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                console.log(xhr.responseText);
                appendMessage(usernameInp.value, messageInp.value);
                // clear inputs
                usernameInp.value = "";
                messageInp.value = "";
            }

        }
    }
    
    function appendMessage(username, message) {
        let msg = document.createElement("div");
        msg.classList.add("chat-message");
        let usr = document.createElement("div");
        usr.classList.add("username");
        usr.innerHTML = username;
        let text = document.createElement("div");
        text.classList.add("text");
        text.innerHTML = message;
        msg.appendChild(usr);
        msg.appendChild(text);
        chatBox.appendChild(msg);
        // scroll to bottom
        msg.scrollIntoView(false);
    }
    
    function getAllMessages() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/posts/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
               // console.log(xhr.response);
                appendMany(xhr.response);
            }
        }
    }
    
    function appendMany(data) {
        let messages = JSON.parse(data);
        for(let i = 0; i < messages.length; i++) {
            appendMessage(messages[i]["username"], messages[i]["message"]);
        }
    }
    
    getAllMessages();
}