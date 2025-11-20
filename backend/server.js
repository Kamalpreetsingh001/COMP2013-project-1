// intializing server 

const express = require("express");
const server = express();
const port = 3000;
const mongoose = require ("mongoose"); // import mongoose
require("dotenv").config(); // import dotenv
const DB_URI = process.env.DB_URI; // to grab the same variable from the dotenv file 
const cors = require("cors"); // For disabling default browser security 
const Products = require("./models/products");  // importing the model schema

// middleware 

server.use(express.json()); // to ensure data is transmitted as json 
server.use(express.urlencoded({extended: true}));  // to ensure data is encoded and decoded while transmission 
server.use(cors());

// Database connection and server listening

mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
        console.log(`Database is connected\nServer is listening on ${port}`);
    });
}).catch((error) => console.log(error.message));


// Routes 

// root route
server.get("/", (request, response) => {
    response.send("server is live!");
});

// to get all the data from products collection 

server.get("/products", async(request, response) => {
try{
    const products = await Products.find();
    response.send(products);
} catch(error) {
    response.status(500).send({message: error.message});
}
});


// to post new product to DB
server.post("/products", async (request, response) => {
    const {name, brand, image, price} = request.body;
    const newproduct = new Products({
        
        productName: name,
        brand,
        image,
        price,
    });
    try {
            await newproduct.save();
            response.status(200).send({message: `Product is added successfully! `});
    }catch(error) {
        response.status(400).send({message: error.message})
    }
});

// to Delete a product from db by id
 
server.delete("/products/:id", async (request,response) => {
    const {id} = request.params;
    try{
        await Products.findByIdAndDelete(id);
        response.send({message: `Product is delete`});

    }catch(error) {
        response.status(400).send({message: error.message});
    }
});


//To GET one product by Id

server.get("/products/:id", async(request, response) => {

    const {id} = request.params

    try{

        const productToEdit = await Products.findById(id);
        response.send(productToEdit);
    }catch(error){
        response.status(500).send({message: error.message});
}
});

// To patch a product by id

server.patch("/products/:id", async (request,response) => {
const {id} = request.params
const {name, brand, image, price} = request.body;
try {
    await Products.findByIdAndUpdate(id, {

        productName: name,
        brand,
        image,
        price,
    });
    response.send({message: `Product has been updated with the id ${id}`,
    date: new Date(Date.now())
    })

}catch(error){


    response.status(500).send({message: error.message});
}

})

