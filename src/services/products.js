import { http } from './config'


export default {

  listar:() => {
    return http.get('product')
  },

  salvar:(product) => {
    return http.post('product', product)
  },

  atualizar:(product)=>{
    return http.put("product/"+ product.id , product)
},

apagar:(product)=>{
  return http.delete("product/"+ product.id , {data:product})
},

}

