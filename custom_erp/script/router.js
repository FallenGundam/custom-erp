let index = {
    template:`
    <div>
    <h1>Home</h1>
    </div>    `
};



let router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'index',
            component: index
        },
        {
            path:'/client',
            name:'client',
            component: client
        },
        {
            path:'/inventory',
            name:'inventory',
            component: inventory
        },

        {
            path:'*',
            redirect:'/'
        }
    ]
})