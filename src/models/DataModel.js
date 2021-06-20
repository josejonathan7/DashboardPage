

let data = [
    {
        id: 0,
        name: "jonathan",
        price: 25,
        quantities: 5,
        amount: 250
    },
    {
        id: 1,
        name: "Marcel",
        price: 85,
        quantities: 17,
        amount: 70
    }
]

module.exports = {
    get(){
        return data
    },
    set(newData){
        data = newData
    },
    update(register, id){
        data.map(data =>{
        const updateData =  data.id === id ? register : data[data.id]
        return updateData
        })
      
    },
    delete(Id){
        data = data.filter(data => data.id !== Id)
    
    }
}
