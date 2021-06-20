const DataBase = require('../models/DataModel')

module.exports = {
    save(req,res){
        DataBase.set({
            name: req.body.name,
            price: req.body.price,
            quantities: req.body.quantities,
            amount: req.body.amount
        });

        return res.redirect("/")
    },
    show(req,res){
        const data = DataBase.get()

        return res.render('index', { data })
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
        DataBase.delete(req.params.id)

        return res.redirect("/")
    }
}
