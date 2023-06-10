const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const createUserToken = require('../utils/createUserToken')
const ObjectId = require('mongoose')
const getUserByToken = require('../utils/getUserByToken')

module.exports = class UserController{
        
    static async register( req, res ){
        
        const {nome, sobrenome, email, password, cpf, tipo} = req.body
        
        if(!nome){
            res.status(422).json({error: 'Nome é obrigatório'})
            return
        }
        if(!sobrenome){
            res.status(422).json({error: 'Sobrenome é obrigatório'})
            return
        }
        if(!email){
            res.status(422).json({error: 'E-mail é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({error: 'Senha é obrigatória'})
            return
        }
        if(!cpf){
            res.status(422).json({error: 'CPF é obrigatória'})
            return
        }
        if(!tipo){
            res.status(422).json({error: 'Tipo é obrigatório'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt) 

        try {
            const newUser = await User.create({
                nome,
                sobrenome,
                cpf,
                tipo,
                email,
                password: passwordHash,
            })
            res.status(201).json({message: 'Usuário criado com sucesso', newUser})
        }catch(err){
            res.status(422).json({error: 'Ocorreu um erro na criação do usuário'})
        }
    }

    static async login( req, res ){

        const {email, password} = req.body

        if(!email){
            res.status(422).json({error: 'E-mail é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({error: 'Senha é obrigatória'})
            return
        }
        
        const user = await User.findOne({email: email})

        if (!user){
            res.status(422).json({error: 'E-mail não existe'})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({error: 'Senha inválida'})
            return
        }

        createUserToken(user, req, res)

    }

    static async delete(req, res){
        
        const id = req.params.id

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const myUser = await getUserByToken(req.headers.authorization)
        const user = await User.findOne({_id:id})

        if(!user){
            return res.status(404).json({error: 'Usuário não existe!'})
        }

        if(myUser.tipo === 'admin'){
            try {
                await User.findOneAndDelete({_id: id})     
                return res.status(200).json({message: 'Usuário removido com sucesso!'})
            }
            catch(err){
                return res.status(500).json({error: 'Ocorreu um erro na deleção do usuário.'})
            }
        }
        else{
            return res.status(500).json({error: 'Você não tem autorização para realizar essa operação.'})
        }
        
    }

    static async updatePasswordAdmin(req, res){
        
        const id = req.params.id
        const {senha} = req.body
        console.log(id)

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const myUser = await getUserByToken(req.headers.authorization)
        const user = await User.findOne({_id:id})

        if(!user){
            return res.status(404).json({error: 'Usuário não existe!'})
        }

        if(!senha || senha.length < 8){
            return res.status(422).json({error: 'Senha inválida'})
        }

        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(senha, salt)

        if(myUser.tipo === 'admin'){
            try {
                await User.findOneAndUpdate({_id: id}, user)     
                return res.status(200).json({message: 'Senha redefinida com sucesso!'})
            }
            catch(err){
                return res.status(500).json({error: 'Ocorreu um erro na redefinição da senha.'})
            }
        }
        else{
            return res.status(500).json({error: 'Você não tem autorização para realizar essa operação.'})
        }
        
    }

    static async getAll(req, res){

        const user = await getUserByToken(req.headers.authorization)

        if(!user){
            res.status(422).json({error: 'Usuário não existe'})
        }

        try{
            const users = await User.find({ _id: { $ne: user._id } })
            return res.status(200).json(users)
        }catch(err){
            return res.status(500).json({error: 'Ocorreu um erro no servidor.'})
        }

    }

    static async getUser(req, res){

        const user = await getUserByToken(req.headers.authorization)

        if(!user){
            res.status(422).json({error: 'Usuário não existe'})
        }

        return res.status(200).json(user)
    }

    static async updateUser(req, res){

        const {nome, sobrenome, email, cpf} = req.body

        const user = await getUserByToken(req.headers.authorization)

        if(!user){
            return res.status(422).json({error: 'Usuário não existe'})
        }

        if(!nome){
            return res.status(422).json({error: 'E-mail é obrigatório'})
        }

        user.nome = nome

        if(!sobrenome){
            return res.status(422).json({error: 'E-mail é obrigatório'})
        }

        user.sobrenome = sobrenome

        if(!email){
            return res.status(422).json({error: 'E-mail é obrigatório'})
        }

        user.email = email

        if(!cpf){
            return res.status(422).json({error: 'E-mail é obrigatório'})
        }

        user.cpf = cpf

        try{
            await User.findOneAndUpdate({_id: user._id}, user)
            console.log('oi')
            return res.status(200).json({message: 'Usuário atualizado com sucesso.'})
        }catch(err){
            return res.status(500).json({error: 'Ocorreu um erro na atualização do usuário.'})
        }
    }

    static async updatePassword(req, res){

        const {senha} = req.body
        console.log(senha)

        const user = await getUserByToken(req.headers.authorization)

        if(!user){
            return res.status(422).json('Usuário não existe')
        }

        if(!senha || senha.length < 8){
            return res.status(422).json('Senha inválida')
        }

        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(senha, salt)
        
        try{

            await User.findOneAndUpdate({_id:user._id}, user)
            return res.status(200).json({message: 'Senha atualizada com sucesso.'})

        }catch(err){
            return res.status(500).json({error: 'Erro ao atualizar a senha.'})
        }

    }

}