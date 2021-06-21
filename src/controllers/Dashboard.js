const DataBase = require('../models/DataModel')

module.exports = {
    index(req,res){
        const data = DataBase.get()

        return res.render('index', { data })
    },
    save(req,res){
        const data = DataBase.get()

        DataBase.set({
            name: req.body.name,
            price: req.body.price,
            quantities: req.body.quantities,
            amount: req.body.amount
        });

        return res.render("index", { data })
    },
    update(req,res){
        const id = req.params.id
    
        DataBase.update({
            name: req.body.name,
            price: req.body.price,
            quantities: req.body.quantities,
            amount: req.body.amount
        }, id)

        return res.rend("/")
    },
    delete(req,res){
        const data = DataBase.get()
        DataBase.delete(req.params.id)

        return res.render("index", { data })
    }
}
