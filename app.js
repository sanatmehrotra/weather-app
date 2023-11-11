import express  from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
   res.render("index.ejs");
});

app.post("/", async(req,res) =>{                                                 
    const city = req.body.cityName;
   //  console.log(req.body.cityName); 
    const apikey = "c2158d5bc25431735970079e208219b9";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city+ "&appid="+apikey+"&units=metric";
    try {
    const response = await axios.get(url);
   //  res.send("Hi from server");
   //  console.log(response);                          
   // const Data = response.data;
   const Data = response.data;
   console.log(response.data);
  const temp = Data.main.temp;
  const description =Data.weather[0].description;
  res.write(`<h1>The temperature in ${city} is ${temp} degree celcius</h1>`);
  res.write(`<p>the weather is ${description} </p>`);
}
catch (error) { 
      // console.log(error.response.data);
      res.status(500); 
}
});

app.listen(port , () => {
console.log(`This server is runing on port ${port}`);
});


