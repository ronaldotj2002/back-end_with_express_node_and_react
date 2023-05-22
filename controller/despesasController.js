const {v4:uuidv4} = require('uuid')
// const {departments} = require ('./departmentController')
const {validateDataDespesas} = require('../model/despesasModel')

const fs = require('fs')

//GET
function getDespesasPromise() {
    return new Promise((resolve, reject) => {        
        fs.readFile('../RTJ/model/data/despesas.json', 'utf8', (err, data) => {
          if (err) {
            reject(err)
          } 
          else {            
            let despesas = JSON.parse(data)            
            resolve(despesas)
          }
        })
    })
}
const getDespesas = (req,res)=>{
    getDespesasPromise()
    .then(despesas => res.status(200).json(despesas))
    .catch(err => res.status(500).send(err.message));
}  


//POST
function addDespesasPromise(despesa) {
  return new Promise((resolve, reject) => {      
    fs.readFile('../RTJ/model/data/despesas.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } 
      else {    
                
        const despesas = JSON.parse(data)   

        // if(despesas.some(e=>e.email===despesa.email))
        // {
        //     reject(new Error('Email already exists'))                  
        // }

        const id = uuidv4()         
        const novaDespesa = { id, ...despesa }  
        
        despesas.push(novaDespesa)  
        
        fs.writeFile('../RTJ/model/data/despesas.json', JSON.stringify(despesas), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(novaDespesa);
          }
        })
      }
    })
  })
}

const addDespesas = (req,res)=>{
    const despesa = req.body
console.log("adicionar despesas...", despesa)
    const validResult = validateDataDespesas(despesa)
       
    if(!validResult.valid)
    {
      return res.status(400).json({message:'Dados inválidos', errors : validResult.errors})
    }     

    // if(!departments.includes(employee.department)) 
    // {
    //   return res.status(404).json({message:'Invalid Department'})
    // }

    addDespesasPromise(despesa)
    .then(novaDespesa => res.status(200).json(novaDespesa))
    .catch(err => res.status(500).send(err.message))
}  


//PUT/PATCH
function updateDespesasPromise(id, despesa) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('../RTJ/model/data/despesas.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        
        let despesas = JSON.parse(data)  
        
        const index = despesas.findIndex((e) => e.id === id)

        if (index === -1) {
          reject(new Error('Employee not found'))
        } 
        else 
        {
          
          const despesaUpdate = { ...despesas[index], ...despesa, email: despesas[index].email }  
          
          despesas[index] = despesaUpdate  
          
          fs.writeFile('../RTJ/model/data/despesas.json', JSON.stringify(despesas), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(despesaUpdate)
            }
          })
        }
      }
    })
  })
}
  
const updateDespesas = (req,res) => {
  const id = req.params.id
  const despesa = req.body

  updateDespesasPromise(id, despesa) 
  .then(despesaUpdate => res.status(200).json(despesaUpdate))
  .catch(err => res.status(500).send(err.message))

}


//DELETE
function removeDespesasPromise(id) 
{
  return new Promise((resolve, reject) => {
    fs.readFile('../RTJ/model/data/despesas.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } 
      else {
        
          const despesas = JSON.parse(data)
          
          const index = despesas.findIndex(e => e.id === id)

          if (index === -1) {
            reject(new Error('despesas not found'))
          } 
          else {
            
            despesas.splice(index, 1)
            
            fs.writeFile('../RTJ/model/data/despesas.json', JSON.stringify(despesas), err => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          }       
      }
    })
  })
}

const removeDespesas = (req,res)=>{      
    const id = req.params.id

    removeDespesasPromise(id)
    .then(() => res.status(200).json({message:'Despesa deletada'}))
    .catch(err => res.status(500).send(err.message))
}


module.exports = {getDespesas, addDespesas, updateDespesas, removeDespesas}