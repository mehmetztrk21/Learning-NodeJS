const fs=require("fs");

const requestHandler=(req,res)=>{
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>First Page</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Save</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end", () => {  //asenkron yapmak istiyorsak return deyimi kullanırız.
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            //  fs.writeFileSync("message.txt",message);  eğer böyle yaparsak büyük verilerde bu yazıları dosyayı yaratıp kaydetmesi çok uzun süreceği için alt satırlara geç iner. Bu da sunucunun aksamasına ve gelen istekler,nanıtsız kalmasına sebep olur.
            /*   res.statusCode=302;  //status kodu 302 (found) olsun.
              res.setHeader("Location","/");  //işlem bittikten sonra buraya dön.
              return res.end();  //response yi tamamla.  */

            //asenkron yapmak.
            fs.writeFile("messageAsync.txt", message, (err) => {
                res.statusCode = 302;  //status kodu 302 (found) olsun.
                res.setHeader("Location", "/");  //işlem bittikten sonra buraya dön.
                return res.end();  //response yi tamamla.
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    //response içeriği
    res.write("<html>");
    res.write("<head><title>First Page</title></head>");
    res.write("<body><h1>Hello World</h1></body>");
    res.write("</html>");
    res.end();
}
// Export etme yolları 

/* module.exports=requestHandler;  //dışarıdan erişebilmek için.  Eğer bunu kullanacaksak çağırdığımız yere export adımınız vermemiz yeterli. const server = http.createServer(routes); gibi


module.exports.handler=requestHandler;
module.exports.someText="Some hard coded text";
 */
module.exports={
    handler:requestHandler,
    someText:"Some hard coded text"
};

