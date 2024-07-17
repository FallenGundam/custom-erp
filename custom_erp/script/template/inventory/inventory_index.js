






let inventory = {
    data: function () {
		return {

            view: 'inv_base_data',

            keyword:"",
			// modal data
			name: "",
            model: "",
            label: "",
            price: 0,
            unit: "",
            type: "",
            remark: "",
            unlimited:false,
            
            search_data_list:[],
            //編輯中index
            selected_item:0,
            inv_id:0,


		
        }
    },

    mounted: function () {  
    },

    methods:{




        save_data(){
            if (confirm('確定新增此筆資料?')){
                if (this.name != '') {


                    let params = {
                        "name": this.name,
                        "model": this.model,
                        "label": this.label,
                        "price": this.price,
                        "unit": this.unit,
                        "type": this.type,
                        "unlimited": this.unlimited,
                        "remark": this.remark,
                    };
                    axios.post('../API/inventory/add_data.php',params)
                    .then(res => {
                        alert(res.data.msg);
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                }else{
                    alert('請至少填寫商品名稱');
					this.$refs.name.focus();
                }
            }
        },

        search_data(){

            axios.get('../API/inventory/search_data.php', {
                params: {
                    key: this.keyword
                }
            })
            .then(res => {
                console.log(res);
                this.search_data_list = res.data;
            })
            


        },

        selected_data(index)
        {
            this.selected_item = index;
            this.inv_id = this.search_data_list[index].id;
        },



        delete_data(index){
            if (confirm('確定刪除此筆資料?')){
                axios.delete('../API/inventory/delete_data.php', {
                    params: {
                        'id':this.search_data_list[index].inv_id
                    }
                })
                .then(res => {
                    console.log(res)
                    this.search_data_list.splice(index, 1)
                })
                .catch(err => {
                    console.error(err); 
                })
            }


        },
    
        changetab(v){

			this.view = v;
		},

        getValFromChild(val){
            this.search_data_list[this.selected_item].name = val.name;
            this.search_data_list[this.selected_item].model = val.model;
            this.search_data_list[this.selected_item].label = val.label;
            this.search_data_list[this.selected_item].price = val.price;

            this.search_data_list[this.selected_item].stats = "否"
            if (this.search_data_list[this.selected_item].amount <= 0){
                if (val.unlimited){
                    this.search_data_list[this.selected_item].stats = "是";
                }
            }else{
                this.search_data_list[this.selected_item].stats = "是"
            }



        }






    },
    template:
    `
    <div id="inventory"> 
        <H1>庫存總覽</H1>
        <hr>
        <div class="row">
            <div class="col-2">
                <button type="button" class="btn btn-success w-100" data-toggle="modal" data-target="#modelId">
                    <img src="../assets/images/106230_add_icon.png" class="img-fluid" width="30px" alt="">
                    新增商品
                </button>
            </div>


            <div class="col-8">
                <input type="text" class="form-control" placeholder="輸入關鍵字" v-model="keyword">
            </div>
            <div class="col-2">
                <button class="btn btn-primary" style="width:100%;" @click="search_data()">搜尋</button>
            </div>


        </div>




        
		
        <div v-if="search_data_list.length == 0" class="py-3">
            <h3 class="text-center">不輸入直接搜尋可查看全部資料<h3>
            <hr>
        </div>
        
        <div v-else class="py-3">
            <h3>一共查到 {{search_data_list.length}} 筆資料</h3>
            <hr>
            <table class="table ">
                <thead>
                    <tr class="table-primary">
                        <th scope="col"></th>
                        <th scope="col">品名</th>
                        <th scope="col">型號</th>
                        <th scope="col">廠牌</th>
                        <th scope="col">售價</th>
                        <th scope="col">庫存</th>
                        <th scope="col">可銷售</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in search_data_list">
                    <tr class="table-info">
                        <th scope="row">{{item.id}}</th>
                        <td>{{item.name}}</td>
                        <td>{{item.model}}</td>
                        <td>{{item.label}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.amount}}</td>
                        <td>{{item.stats}}</td>
                        <td>
                            <button class="btn btn-success" data-toggle="modal" data-target="#item_edit" @click="selected_data(index)">編輯</button>
                            <button class="btn btn-danger" @click="delete_data(index)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



        
        <!-- Modal -->
        
        <!-- 商品編輯 -->
        
        <div class="modal fade" id="item_edit" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
            aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">編輯商品</h5>
                
                

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
						<div class="row py-3">
							<div class="col-2">
								<button class="btn btn-info btn-lg" @click="changetab('inv_base_data')">資料編輯</button>
							</div>
							<div class="col-2">
								<button class="btn btn-info btn-lg" @click="changetab('inv_item_data')">庫存管理</button>
							</div>
							<div class="col-2">
                                <button class="btn btn-info btn-lg" @click="changetab('inv_sell_data')">銷售紀錄</button>
							</div>
						</div>
						<hr>
						
						<keep-alive>
							<component :is="view" :inv_id="inv_id" @value-update="getValFromChild">/component>
						</keep-alive>
						
						
						
					</div>
                </div>
            </div>

        </div>
    
    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <!-- 新增商品 -->
        <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
            aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">添加商品</h5>
                
                

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <h2 class="col-6">商品資訊</h2>
                                <div class="col-6  text-end">
                                    <label for="">登記日期</label>
                                    <input disabled="disabled" type="text" class="form">
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class=" form-group col-12 ">
                                    
                                    
                                    <label class="text-danger">* 
                                        <label class="text-black">
                                            <strong>商品名稱:</strong>
                                        </label>
                                    </label>

                                    <input ref='name' type="text" class="form-control w-50" placeholder="商品名稱" v-model="name">
                                </div>
                                
                                <div class="form-group col-md-6">
                                    <label for="">商品型號:</label>
                                    <input type="text" class="form-control" placeholder="商品型號" v-model="model">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">廠牌:</label>
                                    <input  type="text" class="form-control" placeholder="廠牌" v-model="label">
                                </div>

                                <div class="form-group col-md-3">
                                    <label for="">售價:</label>
                                    <input  type="number" class="form-control" placeholder="售價" v-model="price">
                                </div>

                                <div class="col-3">
                                    <label for="">單位:</label>
                                    <input  type="text" class="form-control" placeholder="單位" v-model="unit">
                                </div>

                                <div class="col-3">
                                    <label for="">類別:</label>
                                    <select class="form-select">
                                        <option selected></option>
                                        <option value="a">SSD</option>
                    
                                    </select>
                                </div>

                                <div class="col-3 py-4 form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="unlimited">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">是否無限庫存</label>
                                </div>


                            </div>
                            <h3>備註</h3>
                            <div class="form-group col-md-12">
                                <textarea class="form-control" v-model="remark" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="save_data">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    
    </div>

    `





}