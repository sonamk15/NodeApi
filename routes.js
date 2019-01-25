const knex = require("./knex");
const routes=[
    {
        method: 'GET',
        path: '/{ramu}',
        handler: (request, h) => {

            return `Hello, ${request.params.ramu}!`;
        }
    },
    {
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {

            return h.file('./public/hello.html');
        }
    },
    {
        method: 'GET',
        path:'/allusers',
        handler:async(request,h)=>{
            let sr = (resolve,reject) => {
                knex("users").select("name","username","email")
                    .then((result)=>{
                        return resolve(h.response(result));
                    })
                    .catch((error)=>{
                        //console.log(error);
                        return reject(h.response(error));
                    });
            }
            return new Promise(sr);
        }
        
    },
    {
        method:'POST',
        path:'/post',
        handler: async( request, h ) => {
            let sr = (resolve,reject)=> {
            return knex.insert({
                name:request.payload.name,
                username:request.payload.username,
                email:request.payload.email,
                password:request.payload.password,
            }).into("users").then((result) => {
                return resolve(h.response(request.payload));
        
            })
            .catch((error) => {
                return reject(h.response(error));
            });
        }
        return new Promise(sr);
    } 
},
{
    method:'Put',
    path:'/put/{users}',
    handler: async(request,h) =>{
        let sr = (resolve,reject)=> {
        const {userid} = request.params;
        return  knex('users').where({
             name:request.payload.name,
            username:request.payload.username,
            email:request.payload.email,
            password:request.payload.password,
            
        
        }).then((result) => {
            return resolve(h.response(request.payload));
        })
        .catch((error)=>{
            return reject(h.response(error));
        });
    }
    return new Promise(sr);
    }
},
{
    method:'Delete',
    path:'/delete/{id}',

    handler: async(request,h) =>{
        let sr = (resolve,reject)=> {
        const {id}=request.params;

        return knex('users').where({
            
                id:id,
            
            }).delete({
                id:id
                 
            }).then((result) => {
                return resolve(h.response(request.payload));
            })
            .catch((error)=>{
                return reject(h.response(error));
            });
            
        }
        return new Promise(sr);
    
    }

            
}
]
module.exports = routes