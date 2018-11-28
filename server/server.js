var express = require('express');
var jwt = require('jsonwebtoken');
var path = require('path');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.png')
  }
});

var upload = multer({ storage: storage });


var {mongoose} = require('./db/mongoose.js');
var Receita = require('./models/receitas.js');
var Usuario = require('./models/usuarios.js');
var Ingredientes = require('./models/ingredientes.js')

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

app.get('/api', (req,res)=>{
	res.sendFile(path.join(__dirname, '../views', 'api.html'));
});

app.post('/api/login',(req,res)=>{
	Usuario.find({username: req.body.username, senha: req.body.senha}).then((usuario)=>{

		if (usuario.length !== 0){
			jwt.sign({user: usuario}, 'secretkey',(err,token)=>{
				res.send({username: req.body.username, email:usuario[0].email, sucess: true, token: token, message: 'Login efeituado com sucesso'});
			});
		}else{
			res.send({sucess: false, message:"Usuário e/ou senha incorretos!"});
		}
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/api/loginAdmin',(req,res)=>{
    Usuario.find({username: req.body.username, senha: req.body.senha, status:1}).then((usuario) =>{

			if (usuario.length !== 0){
				res.redirect('/api/aprovacao');
			}else{
				res.redirect('/');
			}

		});
});



// app.post('/api/loginAdmin',(req,res)=>{
// 	Usuario.find({username: req.body.username, senha: req.body.senha, status: 1}).then((usuario)=>{
//
// 		if (usuario.length !== 0){
// 			jwt.sign({user: usuario}, 'secretkey',(err,token)=>{
// 				res.send({username: req.body.username, sucess: true, token: token, message: 'Login efeituado com sucesso'});
// 			});
// 		}else{
// 			res.send({sucess: false, message:"Usuário e/ou senha incorretos!"});
// 		}
// 	},(e)=>{
// 		res.status(400).send(e);
// 	});
// });

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


app.get('/api/usuarios',(req,res)=>{
	Usuario.find().then((usuarios)=>{
		res.render(path.join(__dirname, '../views', 'lista-usuarios.ejs'), {usuarios: usuarios});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/api/usuarios/add', (req,res)=>{
	res.sendFile(path.join(__dirname, '../views', 'usuario.html'));
});

app.post('/api/usuarios/add', (req,res)=>{
	console.log(req.body);
	var usuario = new Usuario();
	usuario.username = req.body.username;
	usuario.email = req.body.email;
	usuario.senha = req.body.senha;
	usuario.status = req.body.status;

	usuario.save().then(()=>{
		res.redirect('/api/usuarios')
	}),(e)=>{
		res.status(400).send(e);
	}
});

app.post('/api/usuarios/edit', (req, res) => {
	var usuario = new Usuario();

Usuario.findOneAndUpdate({email:req.body.email},{
	$set: {
		username:req.body.username,
		email: req.body.email
	}
}).then(()=>{
     res.send({message: "Atualizado com sucesso!", username: req.body.username});
		 res.redirect('/api/usuarios');
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/api/receitas/edit', (req, res) => {
	var receita = new Receita();

Receita.findByIdAndUpdate(req.body.id,{
    $addToSet: {favoritos: req.body.usuario}
}).then(()=>{
		 res.send({sucess: true, message:"Favoritado com sucesso!"});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/api/receitas/getFavorites', (req,res)=>{
	Receita.find({_id: req.body.id}).then((receita)=>{

    if (receita.length !== 0){
		    res.send({sucess: true, favoritos: receita[0].favoritos});
  }
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/api/receitas/getFavoritesProfile', (req,res)=>{

	Receita.find({favoritos: req.body.usuario}).then((receita)=>{

     if (receita.length !== 0){
		    res.send(receita);
     }
	},(e)=>{
		res.status(400).send(e);
	});
});



app.get('/api/aprovacao',(req,res)=>{
	Receita.find({status: 0}).then((receitas)=>{
		res.render(path.join(__dirname, '../views', 'aprovar-receitas.ejs'), {receitas: receitas});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/file_upload', upload.single('file'), function(req, res) {
  var file = __dirname + '/' + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename
      });
    }
  });
});

app.post('/api/aprovacao', upload.single('file'), (req, res) => {

  var file = __dirname + '/' + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        filepath: req.file.path
      });
    }
  });

	var receita = new Receita();

Receita.findByIdAndUpdate(req.body.id,{
	$set: {
		titulo:req.body.titulo,
    foto: req.file.path,
		ingredientes:req.body.ingredientes.split(','), //
		modoPreparo:req.body.modoPreparo,
		status:req.body.status
	}
}).then(()=>{
		 res.redirect('/api/aprovacao');
	},(e)=>{
		res.status(400).send(e);
	});
});


app.get('/api/ingredientes', (req,res)=>{
	Ingredientes.find().then((ingredientes)=>{
		res.send(ingredientes);
	},(e)=>{
		res.status(400).send(e);
	});
});







app.post('/api/query', (req,res)=>{
	// jwt.verify(req.token,'secretkey',(err, authData)=>{
	// 	if(err){
	// 		res.sendStatus(403);
	// 	}else{


			var query = req.body.query;
      var regex = [];
      for (var i = 0; i < query.length; i++) {
          regex[i] = new RegExp(query[i]);
        }
			Receita.find({status: 1, ingredientes:{ $not: { $elemMatch: { $nin: regex } } }}).then((receitas)=>{
        if (receitas.length !== 0){
          Receita.find({status: 1, ingredientes: {$elemMatch: { $in: regex }}}).then((recomend)=>{
            if (recomend.length !== 0){
              res.send({sucess: true, message: 'Aqui estão as receitas:', receitas: receitas, rec: true, message2:'Recomendamos também essas receitas:', recomend: recomend});
            }
          });
        }
        else{
          Receita.find({status: 1, ingredientes: {$elemMatch: { $in: regex }}}).then((receitasrec)=>{
            if (receitasrec.length !== 0){
              res.send({rec: true, message:'Recomendamos também essas receitas:', recomend: receitasrec});
            }
          });
        }
				//res.render(path.join(__dirname, '../views', 'lista-receitas.ejs'), {receitas: receitas});
			},(e)=>{
				res.status(400).send(e);
			});
		});
// 	})
// });

app.get('/api/receitas', (req,res)=>{
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


app.post('/api/receitas/add', (req, res) => {
	var receita = new Receita();
	receita.titulo = req.body.titulo;
	receita.ingredientes = req.body.ingredientes;
	receita.modoPreparo = req.body.modoPreparo;
	receita.status = req.body.status;
	receita.autor = req.body.autor;
  receita.favoritos = req.body.favoritos;

	receita.save().then(()=>{

	},(e)=>{
		res.status(400).send(e);
	});
});

app.listen(port, ()=>{
	console.log(`Started on port ${port}`);
});
