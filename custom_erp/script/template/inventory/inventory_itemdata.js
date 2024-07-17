

Vue.component ('inv_item_data', {
    props: { 
		inv_id: Number,

	},

	data: function(){
		return {

	
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
        get_data(){

        },
  

			





	},
	
	




    template: `
		<div class="container-fluid">
			<h2>庫存管理</h2>
				
            <div class="row py-3">
                <h4 class="text-primary text-center col-2"> 新增庫存 </h4>

                <div class="form-group col-3">
                    <label for="">進貨日期:</label>
                    <input type="date" class="form-control" placeholder="">
                </div>
                <div class="form-group col-3">
                    <label for="">進貨價格:</label>
                    <input type="number" class="form-control" placeholder="">
                </div>
                <div class="form-group col-2">
                    <label for="">進貨數量:</label>
                    <input type="number" class="form-control" placeholder="">
                </div>
                <div class="col-2"> 
                    <label for=""></label>
                    <button type="button" class="w-100 btn btn-success" @click="">添加 <strong>+</strong></button>
                </div>
                <div class="form-group col">
                    <label for="">備註:</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                </div>
                
            </div>
            <hr>









	
			<div class="modal-footer py-3">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				
			</div>
		</div>
		
	`
})





