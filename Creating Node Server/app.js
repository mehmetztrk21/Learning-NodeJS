const http=require("http");

/* function rqListener(req,res){

}

http.createServer(rqListener);
 */


/* http.createServer(function(req,res){

}); */

const server=http.createServer((req,res)=>{
    //console.log(req);
    console.log(req.url,req.method,req.headers);
    //process.exit();  //süreci durdurmak için kullanılır. (programı durdurur.)

    res.setHeader("Content-Type","text/html");  //response tipi
    //response içeriği
    res.write("<html>"); 
    res.write("<head><title>First Page</title></head>"); 
    res.write("<body><h1>Hello World</h1></body>");
    res.write("</html>");
    res.end();  //response sonu.
});

server.listen(3000); // localhost:3000 portundan gelen talepleri dinle.