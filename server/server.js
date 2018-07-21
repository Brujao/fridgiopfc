var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var Receita = require('./models/receitas.js');
var Usuario = require('./models/usuarios.js');

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login',(req,res)=>{
	Usuario.find({username: req.body.username, senha: req.body.senha}).then((usuario)=>{

		if (usuario.length !== 0){
			jwt.sign({user: usuario}, 'secretkey',(err,token)=>{
				res.send({username: req.body.username, sucess: true, token: token, message: 'Login efeituado com sucesso'});
			});
		}else{
			res.send({sucess: false, message:"Usuário e/ou senha incorretos!"});
		}
	},(e)=>{
		res.status(400).send(e);
	});
});

function verifyToken(req,res,next){
	//Get auth header value
	const bearerHeader = req.headers["authorization"];
	//CHeck if bearer is undefined
	if(typeof bearerHeader !== 'undefined'){
		//Split at the space
		const bearer = bearerHeader.split(' ');
		//Get token from array
		const bearerToken = bearer[1];
		//Set the token
		req.token = bearerToken;
		next();
	}else{
		res.sendStatus(403);
	}
}


app.get('/usuarios',(req,res)=>{
	Usuario.find().then((usuarios)=>{
		res.render(path.join(__dirname, '../views', 'lista-usuarios.ejs'), {usuarios: usuarios});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/usuarios/add', (req,res)=>{
	res.sendFile(path.join(__dirname, '../views', 'usuario.html'));
});

app.post('/usuarios/add', (req,res)=>{
	console.log(req.body);
	var usuario = new Usuario();
	usuario.username = req.body.username;
	usuario.email = req.body.email;
	usuario.senha = req.body.senha;

	usuario.save().then(()=>{
		res.redirect('/usuarios')
	}),(e)=>{
		res.status(400).send(e);
	}
});

app.get('/aprovacao',(req,res)=>{
	Receita.find({status: 0}).then((receitas)=>{
		res.render(path.join(__dirname, '../views', 'aprovar-receitas.ejs'), {receitas: receitas});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/aprovacao', (req, res) => {
	var receita = new Receita();

Receita.findByIdAndUpdate(req.body.id,{
	$set: {
		titulo:req.body.titulo,
		ingredientes:req.body.ingredientes.split(';'),
		modoPreparo:req.body.modoPreparo,
		status:req.body.status
	}
}).then(()=>{
		 res.redirect('/aprovacao');
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/receitas/add',(req, res)=>{
		res.sendFile(path.join(__dirname, '../views', 'add.html'));
});

app.get('/receitas', (req,res)=>{
	// jwt.verify(req.token,'secretkey',(err, authData)=>{
	// 	if(err){
	// 		res.sendStatus(403);
	// 	}else{
			Receita.find({status: 1}).then((receitas)=>{
				res.send(receitas);
				//res.render(path.join(__dirname, '../views', 'lista-receitas.ejs'), {receitas: receitas});
			},(e)=>{
				res.status(400).send(e);
			});
		});
// 	})
// });


app.post('/receitas/add', (req, res) => {
	var receita = new Receita();
	receita.titulo = req.body.titulo;
	receita.ingredientes = req.body.ingredientes;
	receita.modoPreparo = req.body.modoPreparo;
	receita.status = req.body.status;

	receita.save().then(()=>{
		 res.redirect('/receitas');
	},(e)=>{
		res.status(400).send(e);
	});
});

app.listen(port, ()=>{
	console.log(`Started on port ${port}`);
});
