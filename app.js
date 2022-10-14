const express = require('express')
var axios = require('axios');
const app = express()
const puppeteer = require('puppeteer');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const { Telegraf } = require("telegraf")
const bot = new Telegraf("5748468540:AAGiLUhCu2ESADda6qbk9_eW6kSGcTWSivM");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

function log(logtype,message,pipe){
    var timedate = new Date()
    var dataLog = JSON.stringify({
        "logtype": logtype,
        "message": message,
        "pipe": pipe,
        "timedate": timedate
    });

    var sendlog = {
        method: 'post',
        url: 'https://logsapi-production.up.railway.app',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : dataLog
      };
      axios(sendlog)
}



app.post("/", async (req,res)=>{

    res.status(200)

    const user = req.body

    var username = user.firstname + " " + user.lastname
    var nameresponsavel = user.firstname_responsavel 
    var lastnameresponsavel = user.lastname_responsavel
    var useremail = user.email
    var usercpf = user.cpf
    var usernumero = user.number
    var userdata = user.data_nascimento
    var userrg = user.rg
    var userestado = user.state
    var userbairro = user.bairro
    var usergenero = user.genero
    var usercidade = user.city
    var userrua = user.adress1
    var userendereco = user.address2
    var userphone = user.mobile
    var userphone2 = user.phone
    var usercep = user.zipcode
    var responsavel = user.responsavel
    var rg_responsavel = user.rg_responsavel
    var cpf_responsavel = user.cpf_responsavel
    var data_responsavel = user.data_responsavel
    var $cpf = ''
    var $rg = ''
    var $responsavel = ''

    if(responsavel == 'NÃO. Sou responsável pelo tratamento de alguém.'){
        $responsavel = nameresponsavel + " " + lastnameresponsavel
        $cpf = cpf_responsavel
        $rg = rg_responsavel
    }
  
    try {      

        let options = {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],        
            headless: true,
        };

        let browser = await puppeteer.launch(options);
        let page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        await page.goto('https://web.spdataminhaclinica.com.br/login'); 
        
        await log("info","Abrindo SpData","SpData Puppeteer") 

        var usernameInput = await page.$("input[name='username']");
        var passwordInput = await page.$("input[name='password']");
        var submit = await page.$("button[type='submit']");

        await log("info","Fazendo Login","SpData Puppeteer") 
      
         await usernameInput.click();
         await page.keyboard.type("sistemas@soucannabis.ong.br", {
             delay: 10
         });
      
         await passwordInput.click();
         await page.keyboard.type("Qp4jEX5ryf3&9!P#", {
             delay: 10
         });
      
         await submit.click()
      
         await delay(10000)

         await log("info","Login realizado com sucesso! Redirecionando....","SpData Puppeteer") 
      
        await page.goto("https://web.spdataminhaclinica.com.br/paciente/novo")
        

        await log("info","Cadastrando um novo paciente: "+username,"SpData Puppeteer")
        
        await delay(10000)
        
          var nome = await page.$("input[name='nome']");
          await nome.click();
             await page.keyboard.type(username, {
              delay: 100
          });
          await delay(1000)
          var email = await page.$("input[name='email']");
          await email.click();
               await page.keyboard.type(useremail.toString(), {
              delay: 100
          });
          await delay(1000)
          var nomeResponsavel = await page.$("input[name='nomeResponsavel']");
          await nomeResponsavel.click();
            await page.keyboard.type($responsavel.toString(), {
              delay: 100
          });
          await delay(1000)
          await log("info","Preenchendo dados pessoais do paciente","SpData Puppeteer") 
          var cpfResponsavel = await page.$("input[name='cpfResponsavel']");
          await cpfResponsavel.click();
          await page.keyboard.type($cpf.toString(), {
              delay: 100
          });
          await delay(1000)
          var rgResponsavel = await page.$("input[name='rgResponsavel']");
          await rgResponsavel.click();
          await page.keyboard.type($rg.toString(), {
              delay: 100
          });
          await delay(1000)              
          var tipoPessoaFisica = await page.$("input[value='FISICA']");
          await tipoPessoaFisica.click();
          await delay(1000)        
          var cpfOuCnpj = await page.$("input[name='cpfOuCnpj']");
          await cpfOuCnpj.click();
          await page.keyboard.type(usercpf.toString(), {
              delay: 100
          });
          var rgOuIe = await page.$("input[name='rgOuIe']");
          await rgOuIe.click();
          await page.keyboard.type(userrg.toString(), {
              delay: 100
          });
          await delay(1000)
          await log("info","Data de nascimento","SpData Puppeteer") 
          var dataNascimento = await page.$("input[name='dataNascimento']");
          await dataNascimento.click();
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')
          page.keyboard.press('Backspace')

          await page.keyboard.type(userdata.toString(), {
              delay: 100
          });
          await delay(2000)  
         await log("info","Gênero","SpData Puppeteer") 

         page.keyboard.press('Enter')


         var sexo = ''

         if(usergenero.includes("Mulher")){      
          sexo = await page.$("#sexo2");
        }
        if(usergenero.includes("Homem")){      
             sexo = await page.$("#sexo1")                
        }
        if(usergenero.includes("Travesti")){      
             sexo = await page.$("#sexo1");        
        }
        if(usergenero.includes("Não")){      
             sexo = await page.$("#sexo1");        
        }
        if(usergenero.includes("Outro")){      
             sexo = await page.$("#sexo1");        
        }
         await sexo.click();
         await delay(1000)
         await page.select(".js-tipo-telefone", "2")
         await delay(1000)
         var telefone = await page.$("#telefone");
         await telefone.click();
           await page.keyboard.type(userphone.toString(), {
             delay: 10
         });
         await delay(1000)
         var buttonTel = await page.$("span[class='input-group-btn'] > button");
         await buttonTel.click();
         await delay(1000)
         var cep = await page.$("input[name='endereco.cep']");
         await cep.click();
           await page.keyboard.type(usercep.toString(), {
             delay: 10
         });
         await delay(1000)
         await log("info","Preenchendo o endereço","SpData Puppeteer") 
         var endereco = await page.$("input[name='endereco.logradouro']");
         await delay(1000)
         await endereco.click();
             await page.keyboard.type(userendereco.toString(), {
               delay: 10
           });
           await delay(1000)
           var numero = await page.$("input[name='endereco.numero']");
           await numero.click();
            await page.keyboard.type(usernumero.toString(), {
             delay: 10
           });
         await delay(1000)

         await log("info","Selecionando o estado","SpData Puppeteer") 

    var estados = [
        {estadoSigla: 'AC', estado: 'Acre' },
        {estadoSigla: 'AL', estado: 'Alagoas' },
        {estadoSigla: 'AP', estado: 'Amapá' },
        {estadoSigla: 'AM', estado: 'Amazonas' },
        {estadoSigla: 'BA', estado: 'Bahia' },
        {estadoSigla: 'CE', estado: 'Ceará' },
        {estadoSigla: 'DF', estado: 'Distrito Federal' },
        {estadoSigla: 'ES', estado: 'Espírito Santo' },
        {estadoSigla: 'GO', estado: 'Goías' },
        {estadoSigla: 'MA', estado: 'Maranhão' },
        {estadoSigla: 'MT', estado: 'Mato Grosso' },
        {estadoSigla: 'MS', estado: 'Mato Grosso do Sul' },
        {estadoSigla: 'MG', estado: 'Minas Gerais' },
        {estadoSigla: 'PA', estado: 'Pará' },
        {estadoSigla: 'PB', estado: 'Paraíba' },
        {estadoSigla: 'PR', estado: 'Paraná' },
        {estadoSigla: 'PE', estado: 'Pernambuco' },
        {estadoSigla: 'PI', estado: 'Piauí' },
        {estadoSigla: 'RJ', estado: 'Rio de Janeiro' },
        {estadoSigla: 'RN', estado: 'Rio Grande do Norte' },
        {estadoSigla: 'RS', estado: 'Rio Grande do Sul' },
        {estadoSigla: 'RO', estado: 'Rondônia' },
        {estadoSigla: 'RR', estado: 'Roraíma' },
        {estadoSigla: 'SC', estado: 'Santa Catarina' },
        {estadoSigla: 'SP', estado: 'São Paulo' },
        {estadoSigla: 'SE', estado: 'Sergipe' },
        {estadoSigla: 'TO', estado: 'Tocantins' },
      ]

      var estadoOption = ''
      var optionValue = ''
      var optionText = []
    
      estados.forEach(async element => {
         if(element.estadoSigla == userestado){
            estadoOption = element.estado
            estadoOption = estadoOption.toString()            
            optionText = await page.$$eval('#estado > option', options => {
                return options.map(option => option.textContent);
              });
            optionValue = await page.$$eval('#estado > option', options => {
                return options.map(option => option.value);
              });            
              
              for(var x=0;x < optionText.length;x++){
                    if(optionText[x] == estadoOption){
                       await page.select("select[id='estado']", optionValue[x].toString())
                    }
              }
                     
        }        
        
      });

      
      await delay(5000)

      await log("info","Selecionando a cidade","SpData Puppeteer") 

      var optionValueCidade = ''
      var optionTextCidade = []

      optionTextCidade = await page.$$eval('#cidade > option', options => {
        return options.map(option => option.textContent);
      });

      optionValueCidade = await page.$$eval('#cidade > option', options => {
        return options.map(option => option.value);
      });
      
      for(t=0;t<optionValueCidade.length;t++){            
        if(optionTextCidade[t] == usercidade){
            await page.select("select[id='cidade']", optionValueCidade[t].toString())
         }
      }          

        await delay(1000)

        var bairro = await page.$("input[name='endereco.bairro']");
        await bairro.click();
          await page.keyboard.type(userbairro.toString(), {
            delay: 10
        }); 

        var salvar = await page.$("button[data-acao='salvar']");
        await salvar.click();

        await log("info","Cadastro feito com sucesso!","SpData Puppeteer") 
                 
     
    } catch (error) { 
        bot.telegram.sendMessage(5760605862,"Erro ao criar um novo paciente || Puppeteer SpData [criar novo paciente]:  "+error)
    }
})

app.listen(process.env.PORT || 4000, (err)=>{
    if(err)throw err;
    console.log('listening on port 4000')
})