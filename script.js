const Modal = {
    open(){
        document.querySelector('.modal-display').classList.add('active')
    },
    close(){
        document.querySelector('.modal-display').classList.remove('active')
    }
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("Dashboard-page: Operations")) || []
    },
    set(newRegister){
        localStorage.setItem("Dashboard-page: Operations", JSON.stringify(newRegister))
    }
}

const Operations = {
    all: Storage.get(),
    addData(newData){
        Operations.all.push(newData)

        App.reload()
    },
    removeData(index){
        Operations.all.splice(index, 1)

        App.reload()
    }
}
    
const DOM = {
    tableContainer: document.querySelector('#table-product tbody'),
    //enviar os dados para a tabela
    returnDataTable(operations, index){
        let tr = document.createElement('tr')
      
        tr.innerHTML = DOM.innerHTMLdate(operations, index)
        tr.dataset.index = index
        
        DOM.tableContainer.appendChild(tr)
    },
    //receber os dados do html
    innerHTMLdate(operations, index){
        const price = Utils.formatCash(operations.price)
        const amount = Utils.formatCash(operations.amount)
        const quantities = Utils.formatCash(operations.quantities)

        const html = `
            <td>${index+1}</td>
            <td>${Operations.name}</td>
            <td>${price}</td>
            <td>${quantities}</td>
            <td>${amount}</td>
        `
        return html
    },
    clearData(){
        DOM.tableContainer.innerHTML = ""
    }
}

//anexar os dados enviados pelo formulario com o js
const Form = {
    //anexar e receber os dados/campos do formulario com o js
    name: document.querySelector('#form input#name'),
    price: document.querySelector('#form input#amount'),
    quantities: document.querySelector('#form input#quantity'),
    amount: document.querySelector('#form input#total-amount'),

    getValues(){
        return {
            name: Form.name.value,
            price: Form.price.value,
            quantities: Form.quantities.value,
            amount: Form.amount.value
        }     
    },
    validateData(){
        const {name, price, quantities, amount} = Form.getValues()

        if(name.trim() === "" || price.trim() == "" || quantities.trim() == "" || amount.trim() == ""){
            throw new Error("Por favor preencha todos os campos")
        }

    },
    formatData(){
        let {name, price, quantitites, amount} = Form.getValues()

        price = Utils.formatCash(price)
        amount = Utils.formatCash(amount)
        quantitites = Utils.formatNumber(quantitites)

        return{
            name: name,
            price: price,
            quantitites: quantitites,
            amount: amount
        }
    },
    saveData(newData){
        Operations.addData(newData)
    },
    clearFields(){
        Form.name.value = ""
        Form.price.value = ""
        Form.amount.value = ""
        Form.quantities.value = ""
    },
    submitData(event){
        event.preventDefault()

        try {
            //pegando o valor dos dados e validando
            Form.validateData()
            //formatando os dados após a validação
            const dados = Form.formatData()
            //salvando os dados
            Form.saveData(dados)
            //método para limpar os dados
            Form.clearFields()
            //fechando o formulário
            Modal.close()
        } catch (error) {
            alert(error.message)
        }
    }
}


const Utils = {
    formatCash(value){
        let moneyFormated = value
        moneyFormated = Number(moneyFormated).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })

        return moneyFormated
    },
    formatNumber(value){
        let valueFormated = String(value)
        valueFormated.replace("-", "")

        valueFormated = Number(valueFormated)

        return valueFormated
    }
}

//anexar o html com a inserção via JS
const App = {
    init(){
        Operations.all.forEach((operations, index) => {
            DOM.returnDataTable(operations, index)
        })

        Storage.set(Operations.all)
    },
    reload(){
        DOM.clearData()
        App.init()
    }
}

App.init()
