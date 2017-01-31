
//Blog
{
   "blogID1" : {
        "headLine" : "What is Lorem Ipsum?"
        "text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        "publishedDate" : "1485189380000",
        "author" : "Mohamed"
   }, 
   "blogID2" : {
        "headLine" : "What is Lorem Ipsum?",
        "text" : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of xtremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
        "publishedDate" : "1461429123000",
        "author" : "Sahad K P"
   },  
   "blogID3" : {
        "headLine" : "Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
        "text" : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.3xtremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
        "publishedDate" : "1453566723000",
        "author" : "Jubair Arangodan"
   }  
}

//UserComments
{
    "UserID1" : {

    }
}

   "comments" : {
            "blogID1commentID1" : {
                "text": " simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
                "publishedDate" : "1485189483000",
                "author" : "Jubair",
            },
            "blogID1commentID1" : {
                "text": " simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
                "publishedDate" : "1485189483000",
                "author" : "Jubair",
            },
        }

//User
 {
     "userID1" : {
         "blogs" : {
             
         },
         "comments" :{
         },
         "info" : {
            "email" : "example@gmail.com",
            "mobile" : 9995605953,
            "name" : "Mohamed Sahad"
         },
         "login" : {
             "email" : "example@gmail.com",
             "password" : "example#123",
             "status" : true
             "isAdmin" : false
         },
         "isVerified" : true,
         "status" : false
     },
     "userID2" : {
         "info" : {
            "email" : "demo@gmail.com",
            "mobile" : 9995123456,
            "name" : "Sahad"
         },
         "login" : {
             "email" : "demo@gmail.com",
             "password" : "example#123",
             "status" : true
             "isAdmin" : true
         },
         "isVerified" : true,
         "status" : true
     }
 }


------------------------------------------------------------------
Host :  api.blog.com

Method  : POST
URL : <base_url>/login
Request :{
    email : "demo@demo.com",
    password : "demo@123"
}

Responce : {
    status : 1,
    message : "Successfully signup",
    code : 200,
    data : null
}


------------------------------------------------------
Method :POST
URL : <base_url>/signup 

Header : {
    "Content-Type": "application/json" 
}
Request:{
    name : "Test Name",
    mobile : "9995123456",
    email : "demo@demo.com",
    password : "demo@123"
}
Responce : {
    status : 1,
    message : "Successfully logged in",
    code : 200,
    data : {
        token : "eyJhbGciOiJIUzI1kpXVCJ9.eyJfaWQiOiI1ODZmYzQ3NGMwZTI4ODAyNmNlNzEwYWQiLC\KLMS49KIOLdvbFFMTk5OTl9.1Ixn41D1-wYdsdssmOrfn53d5cW3poUk-TR-W0TJ1nY"
    }
}


--------------------------------------------------
Method : POST
URL : <base_url>/blog
 
Header : {
    "Content-Type": "application/json" 
    "Authorization" : "Bearer eyJhbGciOiJIUzI1kpXVCJ9.eyJfaWQiOiI1ODZmYzQ3NGMwZTI4ODAyNmNlNzEwYWQiLCJ0JpYXQiOjE0ODM3MTk5OTl9.1Ixn41D1-wYdsdssmOrfn53d5cW3poUk-TR-W0TJ1nY"
}

Request: { 
    "headLine" : "What is Lorem Ipsum?",
    "text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
}

Responce : {
    status : 1,
    message : "Your blog published successfully",
    code : 200,
    data : null
}


------------------------------------------------------------
Method : PUT
URL : <base_url>/blog
 
Header : {
    "Content-Type": "application/json" 
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODZmYzQ3NGMwZTI4ODAyNmNlNzEwYWQiLCNjMzLCJpYXQiOjE0ODM3MTk5OTl9.1Ixn41D1-wYdsdssmOrfn53d5cW3poUk-TR-W0TJ1nY"
}

Request: {
    "blogID" : 3
    "headLine" : "What is Lorem Ipsum?",
    "text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
}

Responce : {
    status : 1,
    message : "Your blog upated and published successfully",
    code : 200,
    data : null
}


--------------------------------------------------------------------------
Method : DELETE
URL : <base_url>/blog
 
Header : {
    "Content-Type": "application/json" 
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODZNlNzEwYWQiLCJ0adsdsdOTk5NjMzLCJpYXQiOjE0ODM3MTk5OTl9.1Ixn41D1-wYdsdssmOrfn53d5cW3poUk-TR-W0TJ1nY"
}

Request: {
    "blogID" : 3
}

Responce : {
    status : 1,
    message : "Your blog deleted successfully",
    code : 200,
    data : null
}


-----------------------------------------------
Method : GET
URL : <base_url>/blog
 
Header : {
    "Content-Type": "application/json"
}

Request: { 
}

Responce : {
    status : 1,
    message : "All blogs loaded successfully",
    code : 200,
    data : [{
        "blogID" : 1,
        "headLine" : "What is Lorem Ipsum?",
        "text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        "publishedDate" : "1485189380000",
        "author" : "Mohamed"
        "status" :true
    },{
        "blogID" : 2,
        "headLine" : "What is Lorem Ipsum?",
        "text" : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of xtremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
        "publishedDate" : "1461429123000",
        "userID" : "",
        "status" :true
    }, {
        "blogID" : 
        "headLine" : "Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
        "text" : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.3xtremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
        "publishedDate" : "1453566723000",
        "userID" : ""
        "status" :true
    }]
}

-----------------------------------------------
Method : GET
URL : <base_url>/blog/{blogID}
 
Header : {
    "Content-Type": "application/json"
}

Request: {
}

Responce : {
    status : 1,
    message : "All blogs loaded successfully",
    code : 200,
    data : {
        "blogID" : 1,
        "headLine" : "What is Lorem Ipsum?",
        "text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        "publishedDate" : "1485189380000",
        "author" : "Mohamed"
        "status" :true
    }
}

