
new Vue({
    el: '#register',
    data: {
        username: "",
        password: "",
        mail:"",
        conf_pass: ""
    },
    beforeCreate: function () {

    },
    methods: {
        reg: function () {
            if (this.password != "" || this.username != "") {
                if (this.conf_pass == this.password) {

                    param = {
                        "mail": this.mail.trim(),
                        "username": this.username.trim(),
                        "password": this.password.trim()
                    };
                    $.ajax({
                        url: "../API/register.php",
                        type: "POST",
                        data: JSON.stringify(param),
                        processData: false,
                        context: this,
                        contentType: "application/json"
                    }).done(function (msg) {
                        if (msg == "true") {
                            alert("成功註冊! 請重新登入");
                            self.location.reload()
      
                        } else {
                            alert("該帳號已存在");
                        }

                    }).fail(function (jqXHR, textStatus) {
                        console.log(textStatus);
                        console.log(jqXHR.responseText);
                    });
                } else {
                    alert("確認密碼與密碼不一致");
                }

            }else{
                alert("請勿留空");
            }
        }
    }

});