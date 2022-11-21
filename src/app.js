
    const express = require("express"); //importing express
    const path = require("path");//The node path module provides utilities for working with file and directory paths. 
    const app = express();//Node’s require function to use the express module
    const hbs = require("hbs");//Node’s require function to use the express module
    require("./db/conn");// enabling the app.js to connect to mongodb
    const Register = require("./models/register");
    const port = process.env.PORT || 3000;//port for hosting



    const static_path=path.join(__dirname, "../public");//path to public folder
    const template_path = path.join(__dirname, "../templates/views");////path to views folder
    const partials_path = path.join(__dirname, "../templates/partials");////path to partials folder

    app.use(express.json());//parsing data in json form
app.use(express.urlencoded({extended:false}));



    app.use(express.static(static_path));//serve images, CSS files, and JavaScript files in the directory named public:
    app.set("view engine", "hbs");//Using hbs as the default view engine 
    app.set("views", template_path); // setting the template_path as views.
    
hbs.registerPartials(partials_path); // including partials folder 


        app.get("/", (req, res) => {
            res.render("index")          // routing the http request and rendering index.hbs on successful callback.


        });
        app.get("/register", (req, res) => {  // routing the http request and rendering register.hbs on successful callback.
            res.render("register");});
        
            app.get("/login", (req, res) => {    // routing the http request and rendering login.hbs on successful callback.

                res.render("login");
            });

            app.get("/index", (req, res) => { // routing the http request and rendering index.hbs on successful callback.
                res.render("index");
            });

    app.post("/register", async (req, res) => {
                try {
                    console.log(req.body);
                    // accquiring password and confirm password from register.hbs form to check wether the passwords match
                    const password = req.body.password;
                    const cpassword = req.body.confirmpassword;
            // if coorect create new object with the selected details from the form
                    if(password === cpassword){
                        const registerEmployee = new Register({
                            firstname : req.body.firstname,
                            lastname  : req.body.lastname,
                            email     : req.body.email,
                            gender    : req.body.gender,
                            phone     : req.body.phone,
                            age       : req.body.age,
                            password  : password,
                            confirmpassword: cpassword
                        })
                        const registered = await registerEmployee.save(); //after successful request save the data and render the index page again
                        res.status(201).render("index");
                    }else{
                        res.send("passwords are not matching")// if not show the error
                    }
                } catch (error) {
                    res.status(400).send(error);// error if the callback fails due to connection or syntax errors
                }
            });






        app.listen(port, () => {
            console.log(`server is running at port no ${port}`);
        })

    