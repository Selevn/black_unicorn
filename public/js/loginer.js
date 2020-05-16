(function() {
    document.getElementById('pas').addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            {
                if(document.getElementById('email')===null)
                    send_data('login');
                else
                    send_data('register');
            }
        }
    });
})();

function send_data(f)
{
    var params, url;
    if (f == "login")
    {
        url = "/login";
        let login = document.getElementById("login").value;
        let password = document.getElementById("pas").value;
        params=JSON.stringify({login:login,password:make_hash_password(login,password)});
    }

    if (f=="register")
    {
        url = "/register";
        let login = document.getElementById("login").value;
        let password = document.getElementById("pas").value;
        let email = document.getElementById("email").value;
        params=JSON.stringify({login:login,password:make_hash_password(login,password),email:email});
    }

    const request = new XMLHttpRequest();
    console.log(params);
    console.log(url);
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
            if(request.responseText[0]=='<')
            {
                document.getElementById("login").value = '';
                document.getElementById("pas").value = '';
            }
            else if(request.responseText == "Gotcha")
            {
                location.href = "/login";
            }else if(request.responseText.lastIndexOf("email_1 dup key")!=-1)
            {
                alert("This email was already registered in system!");
                document.getElementById("login").value = '';
                document.getElementById("pas").value = '';
                document.getElementById("email").value = '';
            }else if(request.responseText.lastIndexOf("username_1 dup key")!=-1)
            {
                alert("This username was already exist in system!");
                document.getElementById("login").value = '';
                document.getElementById("pas").value = '';
                document.getElementById("email").value = '';
            }
            else
            {
                let data = request.responseText.split('_');
                if(data[0]=='go')
                {
                    location.href = data[1];
                }
            }

        }
    });
    request.send(params);
}

