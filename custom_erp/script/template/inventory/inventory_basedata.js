

Vue.component ('inv_base_data', {
    props: { 
		inv_id: Number,

		

	},

	data: function(){
		return {
			name: "",
			model: "",
			label: "",
			price: 0,
			unit: "",
			type: "",
			remark: "",
			unlimited:false,

	
		}
	},
	watch:{
		inv_id:{
			handler: function(){
				this.get_data();			
				console.log(this.inv_id);
			},
		}
	},
	mounted: function(){
	},
	methods: { 

  

		update_data() {
			let params = {
				"name" : this.name,
				"model" : this.model,
				"label" : this.label,
				"price" :  this.price,
				"unit" : this.unit,
				"type" : this.type,
				"remark" : this.remark,
				"unlimited" : this.unlimited,
				"id": this.inv_id,
			};
			axios.patch('../API/inventory/update_data.php', params)
				.then(res => {
					alert('成功添加!');
					let param = {
						'name': this.name,
						'model': this.model,
						'label': this.label,
						'price': this.price,
						'unlimited': this.unlimited,
					};
                    this.$emit("value-update",param);
					// self.location.reload();
				})
				.catch(err => {
					console.error(err);
				})



		},



		get_data() {
			axios.get('../API/inventory/get_data.php', {
				params: {
					"id": this.inv_id,
				}
			})
			.then(res => {
				console.log(res);

				this.name = res.data.inv_name;
				this.model = res.data.inv_model;
				this.label = res.data.inv_label;
				this.price = res.data.inv_price;
				this.unit = res.data.inv_unit;
				this.type = res.data.inv_type_id;
				this.remark = res.data.inv_remark;
				this.unlimited = (res.data.inv_unlimited==0) ? false : true;

			});






			




			


		},
	},
	




    template: `
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
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" @click="update_data()">Save</button>
			</div>
		</div>
		
	`
})





