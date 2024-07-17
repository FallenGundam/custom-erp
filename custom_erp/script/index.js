
new Vue({
    el: '#index',
    router,
    data: {
        canlogin: true,
        u_name:  $.cookie("u_name"),
    },
    beforeCreate: function () {

    },
    mounted: function () {

        let self = this;
        if (typeof ($.cookie("session_id")) != 'undefined') {
            param = {
                "session_id": $.cookie("session_id"),
                "u_id": $.cookie("u_id"),
            };
            $.ajax({
                url: "../API/session_confirm.php",
                type: "POST",
                data: JSON.stringify(param),
                processData: false,
                context: this,
                contentType: "application/json"
            }).done(function (msg) {
                let result = JSON.parse(msg);
                console.log(result);
                if (result.status){
                    self.canlogin = false;
                }

            }).fail(function (jqXHR, textStatus) {
                console.log(textStatus);
                console.log(jqXHR.responseText);
            });
        }else{
            console.log("cookie不存在");
        }
    },
    methods: {
        logout(){
            $.ajax({
                url: "../API/clear_session.php",
                type: "POST",
                data: JSON.stringify(param),
                processData: false,
                context: this,
                contentType: "application/json"
            }).done(function (msg) {
                console.log(msg);
                $.removeCookie("session_id");
                $.removeCookie("u_id");
                $.removeCookie("u_name");
                self.location.herf="#/";
                self.location.reload();

            }).fail(function (jqXHR, textStatus) {
                console.log(textStatus);
                console.log(jqXHR.responseText);
            });
        }
        
    }

});