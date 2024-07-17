


new Vue({
    el:'#login',
    data:{
        firstopen: true,

        username: "",
        password: "",

        show_num:[],
        conf_code:""

        
    },
    beforeCreate: function() {

	},
    mounted : function() {
        // this.change_code();
        let main = this;

        // window.addEventListener('load',function(){
        //     main.draw(main.show_num,this.document.getElementById('canvas'));
        //     console.log(main.show_num);
        // });
        

    },
    methods:{
        login : function(){
            //let confirmcode = this.show_num.toString().replaceAll(',',"").toLowerCase();
            //if (confirmcode == this.conf_code){
            //}else{
            //    alert("驗證碼錯誤");
                param = {
                    "username": this.username.trim(),
                    "password": this.password.trim()
                };
                $.ajax({
                    url: "../API/login.php",
                    type: "POST",
                    data: JSON.stringify(param),
                    processData : false,
                    context: this,
                    contentType : "application/json"
                }).done(function(msg){
                    let result = JSON.parse(msg);
                    if (result.active){
                        alert("登入成功");
                        $.cookie("session_id", result.session_id);
					    $.cookie("u_id", result.u_id);
                        $.cookie("u_name", result.u_name);
                        self.location.href="index.html";
                    }else{
                        alert(result.error_msg);
                    }


                }).fail(function(jqXHR, textStatus) {
                    console.log(textStatus);
                    console.log(jqXHR.responseText);
                });	
            
            

        },
        change_code : function(e){
            this.draw(this.show_num,e.target);
            console.log(this.show_num);

               
        },

        first_click : function(){
            if (this.firstopen){
                this.draw(this.show_num,document.getElementById('canvas'));
                this.firstopen = false;
                console.log(this.show_num);
            }

        },




        randomColor:function() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        draw:function(show_num,element){
            let canvas_clientWidth = element.clientWidth//畫布長度
            let canvas_clientHeight = element.clientHeight//畫布高度
            let context = element.getContext("2d")//畫布環境 建立 context 物件：
            canvas.width = canvas_clientWidth
            canvas.height = canvas_clientHeight
            let str = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
            let astr = str.split(',');//分割字串形成陣列
            let sLength = astr.length;//陣列長度
            for (let i = 0; i <= 3; i++) {
                let j = Math.floor(Math.random() * sLength);//隨機索引
                let deg = Math.random() * 30 * Math.PI / 180;//0-30隨機弧度
                let text = astr[j];//隨機字元
                show_num[i] = text//驗證碼字元陣列
                let x = 10 + i * 20//x座標
                let y = 20 + Math.random() * 8//y座標
                //位移 旋轉角度 顏色 文字 樣式開始位置
                context.font = 'bold 23px 微軟雅黑'
                context.translate(x, y);
                context.rotate(deg);
                context.fillStyle = this.randomColor();
                context.fillText(text, 0, 0)
                context.rotate(-deg)
                context.translate(-x, -y)
            }
            //驗證碼顯示小點
            for (let i = 0; i <= 30; i++) {
                context.strokeStyle = this.randomColor()//設定隨機色用小點的顏色
                context.beginPath();//開始一條路徑
                let m = Math.random() * canvas_clientWidth;
                let n = Math.random() * canvas_clientHeight;
                context.moveTo(m, n)//移動
                context.lineTo(m + 1, n + 1);//新增一個新點，然後在畫布中建立從該點到最後指定點的線條
                context.stroke();//畫上面定義好的路徑
            }
            //驗證碼顯示線條
            for (let i = 0; i < 8; i++) {
                context.strokeStyle = this.randomColor()
                context.beginPath()
                context.moveTo(Math.random() * canvas_clientWidth, Math.random() * canvas_clientHeight);
                context.lineTo(Math.random() * canvas_clientWidth, Math.random() * canvas_clientHeight)
                context.stroke()

            }
        }


    }

});

// <canvas class="col-5" id="canvas" @click="change_code($event)"></canvas>