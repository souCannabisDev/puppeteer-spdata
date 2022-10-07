const express = require('express')
const app = express()
const puppeteer = require('puppeteer');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post("/", async (req,res)=>{

    res.status(200)

console.log(req.body)

    const user = req.body
    console.log(user.firstname)
    const primeironome = user.firstname
    const sobrenome = user.lastname
    const useremail = user.email
    

    try {      

        let options = {
            defaultViewport: {
                width: 1366,
                height: 768,
            },
            headless: false,
        };

        let browser = await puppeteer.launch(options);
        let page = await browser.newPage();
        //await page.goto('https://web.spdataminhaclinica.com.br/login');

        var usernameInput = await page.$("input[name='username']");
        var passwordInput = await page.$("input[name='password']");
        var submit = await page.$("button[type='submit']");
      
        // await usernameInput.click();
        //   await page.keyboard.type("sistemas@soucannabis.ong.br", {
        //     delay: 10
        // });
      
        // await passwordInput.click();
        //   await page.keyboard.type("Qp4jEX5ryf3&9!P#", {
        //     delay: 10
        // });
      
        // await submit.click()
      
        // await page.waitForSelector("#main-navbar")
      
        await page.goto("file:///C:/Users/felip/Downloads/Cadastro%20de%20paciente.html")
      
        var nome = await page.$("input[name='nome']");
        await nome.click();
           await page.keyboard.type(primeironome, {
            delay: 100
        });
        await delay(1000)
        var email = await page.$("input[name='email']");
        await email.click();
             await page.keyboard.type(useremail, {
            delay: 100
        });
        await delay(1000)
        var nomeResponsavel = await page.$("input[name='nomeResponsavel']");
        await nomeResponsavel.click();
          await page.keyboard.type("xxxx", {
            delay: 100
        });
        await delay(1000)
        var cpfResponsavel = await page.$("input[name='cpfResponsavel']");
        await cpfResponsavel.click();
        await page.keyboard.type("453453543", {
            delay: 100
        });
        await delay(1000)
        var rgResponsavel = await page.$("input[name='rgResponsavel']");
        await rgResponsavel.click();
        await page.keyboard.type("45345354345", {
            delay: 100
        });
        await delay(1000)
        var tipoPessoaFisica = await page.$("input[value='FISICA']");
        await tipoPessoaFisica.click();
        await delay(1000)        
        var cpfOuCnpj = await page.$("input[name='cpfOuCnpj']");
        await cpfOuCnpj.click();
        await page.keyboard.type("453453543", {
            delay: 100
        });
        var rgOuIe = await page.$("input[name='rgOuIe']");
        await rgOuIe.click();
        await page.keyboard.type("453453543", {
            delay: 100
        });
        await delay(1000)
        var dataNascimento = await page.$("input[name='dataNascimento']");
        await dataNascimento.click();
        await page.keyboard.type("01/01/0101", {
            delay: 100
        });
        await delay(1000)        
        var sexoMasc = await page.$("input[value='MASCULINO']");
        await sexoMasc.click();
        await delay(1000)
        await page.select(".js-tipo-telefone", "2")
        await delay(1000)
        var telefone = await page.$("#telefone");
        await telefone.click();
          await page.keyboard.type("48999778888", {
            delay: 10
        });
        await delay(1000)
       // var buttonTel = await page.$("span[class='input-group-btn'] > button");
      //  await buttonTel.click();
      //  await delay(1000)
        var cep = await page.$("input[name='endereco.cep']");
        await cep.click();
          await page.keyboard.type("xxxx", {
            delay: 10
        });
        await delay(1000)
        var endereco = await page.$("input[name='endereco.logradouro']");
        await delay(1000)
        await endereco.click();
          await page.keyboard.type("xxxx", {
            delay: 10
        });
        await delay(1000)
        var numero = await page.$("input[name='endereco.numero']");
        await numero.click();
          await page.keyboard.type("xxxx", {
            delay: 10
        });
        await delay(1000)
        var estado = await page.$("select[id='estado']");
        await delay(1000)
        var cidade = await page.$("select[id='cidade']");
        await delay(1000)
        var complemento = await page.$("input[name='endereco.complemento']");
        await complemento.click();
          await page.keyboard.type("xxxx", {
            delay: 10
        });
        await delay(1000)
        var bairro = await page.$("input[name='endereco.bairro']");
        await bairro.click();
          await page.keyboard.type("xxxx", {
            delay: 10
        });   
     
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 3000, (err)=>{
    if(err)throw err;
    console.log('listening on port 3000')
})