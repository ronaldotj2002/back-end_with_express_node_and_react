const {Validator} = require('jsonschema')
const validator = new Validator()

const despesasSchema = {    
    type: "object",
    properties: {
        id: {type: 'string'},
        data: {type: 'string'},
        tipoDespesa: {type: 'string'},
        nomeDespesa: {type: 'string'},
        valor: {type: Number},
        descricao:{type:'string'}           
    },
    "required": ['data', 'tipoDespesa', 'nomeDespesa', 'valor', 'descricao']
  }

  const validateDataDespesas = (e)=>{
    return validator.validate(e, despesasSchema)
  }

  module.exports= {validateDataDespesas}