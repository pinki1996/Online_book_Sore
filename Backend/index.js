

const Express = require("express")
const jwt =  require("jsonwebtoken")
const app = Express()
const path = require('path');
const ejs = require("ejs")
app.set("view engine", "ejs")
app.use(Express.urlencoded())
const fs = ('fs')
const Cors = require("cors")
app.use(Express.json())
app.use(Cors())
const multer = require('multer')
const Mongoose = require("mongoose") 
const secretKey= "secretKey"
const bcrypt = require("bcrypt")

const cookiesParser = require("cookie-parser")
const SignupData = require("./Model/user")
const BookModel = require("./Model/book")
const AdminData = require("./Model/admin")
const customerData = require("./Model/customer")
app.use(cookiesParser())
app.use('/uploads',Express.static('uploads'))


Mongoose.connect("mongodb://127.0.0.1:27017/online_book_store")




//Login 

app.get("/", Cors(), (request, response) => {

})

app.post("/", async (request, response) => {
    const { email, password } = request.body

     const output = await SignupData.findOne({email:email})

     if(!output){
        return response.json({status:"error", error:"Invalid Username/Password"})
     }
     if(bcrypt.compare(password, output.password)){

        const token = jwt.sign({ id:output._id,  email:output.email }, secretKey)

        return response.json({status:"ok", data:token})
     }
     response.json({status:"error", error:"Invalid Username/Password"})
})


//Sign up

app.post("/signup", async (request, response) => {
    const { name, email, password, confirmPassword } = request.body

    if(password === confirmPassword)
    {
       const securedPassword = await bcrypt.hash(password, 15)
        // salt
        const signupData = new SignupData({
            username: request.body.name,
            email: request.body.email,
            password: securedPassword
        })
        signupData.save()
    }
    else
    {
        console.log("Passwords are not Equal!!!")
    }
    response.send("You task saved successfully!!")
})

    app.post("/update_profile", async(request, response)=>{
        const { token, name, password} = request.body
        // console.log({name, password})
        try{
            const user = jwt.verify(token, secretKey)
            const id= user.id
            const securedPassword = await bcrypt.hash(password, 15)

            await SignupData.updateOne({_id:id},{
                $set:{
                    username:name,
                    password:securedPassword
                }
            })
                response.json({status:"ok"})
        }catch(error){
            response.json({status:'error', error:"error"})
        }   
        
    })
    //Customer Details
    app.post("/customer", async(request, response)=>{
     
        const { name, email, city, date, state, country, pinCode, amount } = request.body
        
    if(name != null)
    {
       
        const custumer = new customerData({
            username: request.body.name,
            email: request.body.email,
            city: request.body.city,
            state: request.body.state,
            country: request.body.country,
            pincode:request.body.pinCode,
            amount: request.body.amount,
            date:request.body.date
        })
        custumer.save()
    }
    else
    {
        console.log("User is not Present")
    }
    response.send("You task saved successfully!!")
        
    })


//display books

app.get("/displayBooks", function(req, res){
    BookModel.find()
    .then(function(output)
    {
        res.send(output)
       
    })
    .catch(function(error)
    {
        res.render(error)
    })
})
app.post("/displayBooks/:id", async function(req, res){
    const ID = req.params.id
    // console.log(ID)
    await BookModel.findOne({bookId:ID})
    .then(function(output)
    {
        res.send(output)
        // console.log(output)
    })
    .catch(function(error)
    {
        res.render(error)
    })
})




//Admin Panel



app.get("/admin", function (request, response) {
    response.render("login.ejs" )
})
app.post("/admin", function (request, response) {
    //Logic to go back to the login page
    response.redirect("/admin/login")
})

app.get("/admin/signup", async function (req, res) {
    res.render("signUp.ejs")
})

app.get("/admin/login", function (request, response) {
    response.render("login.ejs")

})

app.get("/admin/addBook", function (request, response) {
    response.render("addBook.ejs"  )

})


//SIGN UP

app.post("/admin/signup", async function (request, response) {
    // Logic to collect the signup details

    const myUsername = request.body.username
    const myEmail = request.body.email
    const myPassword = request.body.password
    const myConfirmPassword = request.body.confirmpassword

    if (myPassword === myConfirmPassword) {
        const adminsignupData = new AdminData({
            username: myUsername,
            email: myEmail,
            password: myPassword
        })
        adminsignupData.save()
    }
    else {
        console.log("Passwords are not Equal!!!")
    }

    response.redirect("/admin/login")

})


//Login page

app.post("/admin/login", async function (request, response) {
    //logic to collect the email and password
    const myEmail = request.body.email
    const myPassword = request.body.password

    //logic to varify if the email that is used to login is really valid or not

    const output = await AdminData.findOne({ email: myEmail })

    if (output == null) {
        response.redirect("/admin/login")
        console.log("password not matched")
    }

    else {
        console.log("password matched")
        response.redirect("/admin/displayBook")
    }
})


//ADD BOOK



const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
 
const upload = multer({ storage: storage }) 

app.post("/admin/addBook", upload.single('bookImg'), async function (request, response) {
    // Logic to collect the signup details
    const myBookId = request.body.bookId
    const myBookName = request.body.bookName
    const myBookImg = request.file.originalname
    const myBookAuthor = request.body.bookAuthor
    const myBookDesc = request.body.bookDesc
    const myBookPrice = request.body.bookPrice

    
    if (await BookModel.findOne({ bookName: myBookName })) {
        
        
        response.alert("Book Name Already exists")
    }
    else {
        const BookData = new BookModel({
            bookId: myBookId,
            bookName: myBookName,
            bookImage: myBookImg,
            bookAuthor: myBookAuthor,
            bookDesc: myBookDesc,
            bookPrice: myBookPrice
        })
        BookData.save()
    }

    response.redirect("/admin/displayBook")

})

app.get("/admin/displayBook", async function(req, res)
{
    const booksData = await BookModel.find({})
        // console.log(booksData)
        res.render("displayBook.ejs", { book : booksData})

})

    //Sell Report

app.get("/admin/sellReport", async function(req, res)
{
    const sellData = await customerData.find({})
    res.render("sellReport.ejs", { sell : sellData})


})
 
    //edit individual book

    app.get("/admin/displayBook/edit/:id", async function(request, response)
    {
        const ID = request.params.id
        const particularBookData = await BookModel.findOne({ bookId : ID})
        if(particularBookData){
            response.render("editBook.ejs", { particularBook : particularBookData})
        }
         else{
           console.log("error occured")
         }
    })

    

    
    app.post("/admin/displayBook/edit/:id", upload.single('bookImg'), async function(request, response)
    {
        const ID = request.params.id
        let new_image = ""

        if(request.file){
            new_image = request.file.filename
            try{
                fs.unlinkSync('./uploads/'+request.body.old_image)
            } catch(error){
                console.log(error)
            }
        } else{
            new_image = request.body.old_image
        }
        await BookModel.updateOne({ bookId:ID},
            {
                bookName: request.body.bookName,
                bookAuthor: request.body.bookAuthor,
                bookImage:new_image,
                bookDesc: request.body.bookDesc,
                bookPrice: request.body.bookPrice
            })
                response.redirect("/admin/displayBook")
           
        })
       
 
        //delete book

app.get("/admin/displayBook/delete/:id", async function(request, response)
    {
        const ID = request.params.id
        await BookModel.deleteMany({ bookId:ID })
        .then(function(output)
        {
           response.send(alert("Are You want to delete the Book"))
        })
        .catch(function(error)
        {
            response.render(error)
        })
        response.redirect("/admin/displayBook")
    })




app.listen(5000, function () {
    console.log("server is running at 5000")
})