

Vue.component ('client_base_data', {
    props: { 
		cid: Number,

	},

	data: function(){
		return {
			name: "",
			gender: "",
			birthday: "",
			fax: "",
			mail: "",
			phone: "",

			company: "",
			locate: "",
			telephone: "",
			url: "",

			remark: "",
			reg_date: "",
			cid:0,
	
		}
	},
	watch:{
		cid:{
			handler: function(){
				this.get_data();			
				console.log(this.cid);
			},
		}
	},
	mounted: function(){
	},
	methods: { 

  

		update_data() {
			let params = {
				"c_id": this.cid,
				"name": this.name,
				"gender": this.gender,
				"birthday": this.birthday,
				"fax": this.fax,
				"mail": this.mail,
				"phone": this.phone,
				"company": this.company,
				"locate": this.locate,
				"telephone": this.telephone,
				"url": this.url,
				"remark": this.remark,
			};
			axios.patch('../API/client_manager/update_data.php', params)
				.then(res => {
					alert('成功添加!');

					let param = {
						'phone': this.phone,
						'mail': this.mail,
						'name': this.name,
					};
                    this.$emit("value-update",param);
					// self.location.reload();
				})
				.catch(err => {
					console.error(err);
				})



		},



		get_data() {
			axios.get('../API/client_manager/get_data.php', {
				params: {
					"c_id": this.cid,
				}
			})
			.then(res => {
				// console.log(res);
				this.name = res.data.c_name;
				this.gender = res.data.c_gender
				this.birthday = res.data.c_birthday
				this.fax = res.data.c_fax
				this.mail = res.data.c_mail
				this.phone = res.data.c_phone
				this.company = res.data.c_company
				this.locate = res.data.c_locate
				this.telephone = res.data.c_telephone
				this.url = res.data.c_url
				this.remark = res.data.c_remark
				this.reg_date = res.data.c_reg_date
			});






			




			


		},
	},
	




    template: `
		<div class="container-fluid">
			<div class="row">
				<H1 class="col-6">基本資料編輯</H1>	
				<div class="col-6 text-end">
					<label for="">登記日期</label>
					<input disabled="disabled" type="text" class="form" v-model="reg_date" placeholder="Email">
				</div>


				<div class="form-group col-md-6">
					<label for="">姓名</label>
					<input ref=name type="name" class="form-control" v-model="name" placeholder="姓名">
				</div>
				
				<div class="col-md-3">
					<label >性別</label>
					<select class="form-select" v-model="gender" aria-label="Default select example">
						<option selected></option>
						<option value="男">男</option>
						<option value="女">女</option>
						<option value="其他">其他</option>
					</select>
				</div>
				<div class="col-md-3">
					<label >生日</label>
					<input type="date" class="form-control" v-model="birthday">
				</div>

				<div class="form-group col-md-5">
					<label for="">傳真</label>
					<input type="number" class="form-control"  v-mode="fax" placeholder="傳真">
				</div>
				<div class="form-group col-md-7">
					<label for="">Email</label>
					<input type="mail" class="form-control" v-model="mail" placeholder="Email">
				</div>

				<div class="form-group col-md">
					<label for="">手機</label>
					<input type="number" class="form-control" v-model="phone" placeholder="手機">
				</div>
				
			</div>

			<hr>
			<h2>公司資訊</h2>

			<div class="row">
			<div class="form-group col-md">
				<label for="">名稱</label>
				<input type="name" class="form-control" v-model="company" placeholder="名稱">
			</div>
			<div class="form-group col-md-6">
				<label for="">電話</label>
				<input type="number" class="form-control" v-model="telephone" placeholder="電話">
			</div>
			<div class="form-group col-md-12">
				<label for="">地址</label>
				<input type="phone" class="form-control" v-model="locate" placeholder="地址">
			</div>

				<div class="form-group col-md-12">
					<label for="exampleFormControlTextarea1">url</label>
					<textarea class="form-control" id="exampleFormControlTextarea1"
						rows="1"></textarea>
				</div>
			</div>
			<hr>
			<h3>備註</h3>
			<div class="form-group col-md-12">
				<textarea class="form-control" v-model="remark" id="exampleFormControlTextarea1"
					rows="3"></textarea>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" @click="update_data()">Save</button>
			</div>
		</div>
		
	`
})





