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
    },
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

        const html = `
            <td>${index+1}</td>
            <td>${operations.name}</td>
            <td>${operations.price}</td>
            <td>${operations.quantities}</td>
            <td>${operations.amount}</td>
            <td><img src="./assets/remove-document.png" alt="" id="image-remove" onclick="Operations.removeData(${index})"></td>
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
        let {name, price, quantities, amount} = Form.getValues()

        price = Utils.formatCash(price)
        amount = Utils.formatCash(amount)
        quantities = Utils.formatNumber(quantities)

        return{
            name: name,
            price: price,
            quantities: quantities,
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
            const dados = Form.formatData();
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
        let valueFormated = String(value).replace("-", "")
        let valueFinal

        valueFinal = Number(valueFormated)

        return valueFinal
    },
    formatDate(){
        const dates = new Date()
        let date = String(dates).split(" ");
        const month = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"
        ]

       switch (date[1]) {
           case "Jan":
               date[1] = month[0]
               break;
            case "Feb":
                date[1] = month[1]
                break;
           case "Mar":
               date[1] = month[2]
               break;
           case "Apr":
               date[1] = month[3]
               break;
           case "May":
               date[1] = month[4]
               break;
           case "Jun":
               date[1] = month[5]
               break;
           case "Jul":
               date[1] = month[6]
               break;
           case "Aug":
               date[1] = month[7]
               break;
           case "Sep":
               date[1] = month[8]
               break;
           case "Oct":
               date[1] = month[9]
               break;
           case "Nov":
               date[1] = month[10]
               break;
            case "Dec":
               date[1] = month[11]
               break;
           default:
               break;
       }

        let finalDate = `${date[4]}, ${date[2]}/${date[1]}/${date[3]}`

        return  document.querySelector('button#date').innerHTML = finalDate
    }
}

//anexar o html com a inserção via JS
const App = {
    init(){
        Utils.formatDate()

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