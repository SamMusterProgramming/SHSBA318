let comments =  [
    { 
        id:100,
        comment_count: 2,
        
        content:[ {
            user_d:0,
            date : new Date(),
            comment :"I just got up"
            },{
            user_d:0,
            comment :"I just got up"
            }
        ] 
    },
    { 
        id:101,
        content:[ {
            user_d:2,
            date : new Date(),
            comment :"right"
        }] 
    },
    { 
        id:102,
        content:[ {
            user_d:2,
            date : new Date(),
            comment :"hey everybody"
        }] 
    },
    {
    id :103,
    content:[ {
        date : new Date(),
        user_d:2,  
        comment :"right"
    },{
        date : new Date(),
        user_d:1,
        comment :"right"
    },{
        date : new Date(),
        user_d:0,
        comment :"hello there , how y'all are doing ? "
    }]
   }
]



module.exports = comments ; 