
function getTodayDate() {
	let fullDate = new Date();
	let yyyy = fullDate.getFullYear();
	let MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
	let dd = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
	let today = yyyy + "/" + MM + "/" + dd;
	return today;
  }


let client = {
	data: function () {
		return {
			// modal data
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
			reg_date: getTodayDate(),

			//判別是否是編輯舊資料
			editing_data: null,

			key: "",
			searchdata: [],







		}
	},

	mounted: function () {
	},

	methods: {



		// 搜索資料
		search() {

			axios.get('http://localhost/php_project/API/client_manager/get_data.php', {
				params: {
					key: this.key.trim()
				}
			})
				.then(res => {
					console.log(res.data);
					if (res.data.length > 0) {
						this.searchdata = res.data;
					}else{
						alert('查無資料');
					}


				})
				.catch(err => {
					console.error(err);
				})


		},

		// modal中的變數初始化
		clear_current_data() {
			this.name = "";
			this.gender = "";
			this.birthday = "";
			this.fax = "";
			this.mail = "";
			this.phone = "";
			this.company = "";
			this.locate = "";
			this.telephone = "";
			this.url = "";
			this.remark = "";
			this.reg_date= getTodayDate();

			this.editing_data = null;
		},



		// 刪除資料
		delete_data(id, index) {

			if (confirm('確定刪除?')) {
				this.searchdata.splice(index, 1);

				axios.delete('http://localhost/php_project/API/client_manager/delete_data.php', {
					params: {
						id: id
					}
				})
					.then(res => {
						console.log(res);
					})
			}
		},


		// 將要編輯的資料放入 綁定modal的變數
		edit_data(index) {
			this.name = this.searchdata[index].c_name;
			this.gender = this.searchdata[index].c_gender
			this.birthday = this.searchdata[index].c_birthday
			this.fax = this.searchdata[index].c_fax
			this.mail = this.searchdata[index].c_mail
			this.phone = this.searchdata[index].c_phone
			this.company = this.searchdata[index].c_company
			this.locate = this.searchdata[index].c_locate
			this.telephone = this.searchdata[index].c_telephone
			this.url = this.searchdata[index].c_url
			this.remark = this.searchdata[index].c_remark
			this.reg_date = this.searchdata[index].c_reg_date

			this.editing_data = index;

		},




		update_data(index) {
			let params = {
				"c_id": this.searchdata[index].c_id,
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
			axios.patch('http://localhost/php_project/API/client_manager/update_data.php', params)
				.then(res => {
					console.log(res)

					this.searchdata[index].c_name = this.name;
					this.searchdata[index].c_gender = this.gender;
					this.searchdata[index].c_birthday = this.birthday;
					this.searchdata[index].c_fax = this.fax;
					this.searchdata[index].c_mail = this.mail;
					this.searchdata[index].c_phone = this.phone;
					this.searchdata[index].c_company = this.company;
					this.searchdata[index].c_locate = this.locate;
					this.searchdata[index].c_telephone = this.telephone;
					this.searchdata[index].c_url = this.url;
					this.searchdata[index].c_remark = this.remark;
					alert('成功添加!');
					// self.location.reload();
				})
				.catch(err => {
					console.error(err);
				})



		},


		// 新增資料
		savedata() {
			if (this.editing_data == null) {
				if (confirm('確定新增此筆資料?')) {

					if (this.name != '') {


						let param = {
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
						axios({
							method: 'post',
							url: 'http://localhost/php_project/API/client_manager/add_data.php',
							data: {
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
							}
						}).then(res => {
							console.log(res.data);
							if (res.data.status == false) {
								alert(res.data.msg);
							} else {
								self.location.reload();
							}
						})
							.catch(err => {
								console.error(err);
							})
					} else {
						alert('請至少填寫客戶名稱');
						this.$refs.name.focus()

					}


				}
			} else {
				this.update_data(this.editing_data);
			}

		},
	},




	template:
		`
	<div id="client_manager">
	

		<H1>客戶資料管理</H1>
		<hr>

		<div class="row">



			<div class="col-2">
				<button type="button" class="btn btn-info w-100" data-toggle="modal" data-target="#modelId" @click="clear_current_data()"> </a>
						<img src="../assets/images/106230_add_icon.png" class="img-fluid" width="30px" alt="">
						新增客戶
				</button>
			</div>
			

			<div class="col">
				<input type="text" class="form-control" v-model="key" placeholder="輸入關鍵字">
			</div>
			<div class="col-2">
				<button class="btn btn-primary" style="width:100%;" @click="search()">搜尋</button>
			</div>
			
			
			


		</div>
		

		
		<div class="py-3">
			<div v-if="searchdata.length == 0">
				<h3 class="text-center">不輸入直接搜尋可查看全部資料<h3>
				<hr>
			</div>
			
			<div v-else>
				<h3>一共查到 {{searchdata.length}} 筆資料</h3>
				<hr>
				<table class="table ">
				<thead>
					<tr class="table-primary">
						<th scope="col">編號</th>
						<th scope="col">名稱</th>
						<th scope="col">手機</th>
						<th scope="col">Email</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
					<tbody v-for="(item,index) in searchdata">
						<tr class="table-info">
							<th scope="row">{{item.c_id}}</th>
							<td>{{item.c_name}}</td>
							<td>{{item.c_phone}}</td>
							<td>{{item.c_mail}}</td>
							<td>
								<button class="btn btn-success" data-toggle="modal" data-target="#modelId" @click="clear_current_data(); edit_data(index)">編輯</button>
								<button class="btn btn-danger" @click="delete_data(item.c_id,index)">刪除</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		


		<!-- Modal -->
		<!-- 新增商品 -->
		<div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
			aria-hidden="true">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">客戶資料編輯</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="container-fluid">
							
							<div class="row">
								<H1 class="col-6">基本資料</H1>	
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
									<select class="form-select" aria-label="Default select example">
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
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary" @click="savedata">Save</button>
						</div>
					</div>
				</div>
			</div>

		</div>
		


	</div>
	`
};

