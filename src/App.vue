<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Licitanet </a>
      </div>
    </nav>

    <div class="container">
      <!--
      {{product.id}}
     
      <ul>
        <li >
           <b> {{erros}}</b>
        </li>
      </ul>
      -->
      <form @submit.prevent="salvar">

        <label>Codigo Produto</label>
        <input type="number" placeholder="Codigo do Produto * Unico" v-model="product.cod_produto">
        <label>Nome Produto</label>
        <input type="text" placeholder="Nome Produto" v-model="product.nome_produto">
        <label>Valor Produto</label>
        <input type="number" placeholder="Valor Produto" v-model="product.valor_produto">
        <label>Estoque</label>
        <input type="number" placeholder="Estoque" v-model="product.estoque">
        <label>Cidade</label>
        <input type="number" placeholder="Cidade" min="0" max="11" v-model="product.fk_cidade">

        <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Codigo Produto</th>
            <th>Nome Produto</th>
            <th>Valor Produto</th>
            <th>Estoque</th>
            <th>Cidade</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="product of products" :key="product.id">

            <td>{{product.id}}</td>
            <td>{{product.cod_produto}}</td>
            <td>{{product.nome_produto}}</td>
            <td>R${{product.valor_produto}}</td>
            <td>{{product.estoque}}</td>
            <td>{{product.fk_cidade}}</td>
            <td>
              <button @click="editar(product)" class="waves-effect btn-small blue darken-1"><i
                  class="material-icons">create</i></button>
              <button @click="remover(product)" class="waves-effect btn-small red darken-1"><i
                  class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  </div>
</template>

<script>
import Product from './services/products'

export default {

  data() {
    return {
      product: {
        id: '',
        cod_produto: '',
        nome_produto: '',
        valor_produto: '',
        estoque: '',
        fk_cidade: ''
      },
      products: [],
      erros: []
    }
  },

  mounted() {
    this.listar()
  },

  methods: {

    listar() {
      Product.listar().then(resposta => {
        // eslint-disable-next-line
        this.products = resposta.data
      })
    },

    

    salvar() {

      if (!this.product.id) {
        // eslint-disable-next-line
        Product.salvar(this.product).then(resposta => {
          this.product = {}
          alert('O Produto foi salvo em nossa base de dados com sucesso!')
          this.listar()
          this.erros = []
        }).catch(e => {
          this.erros = e.response.data.message
        })

      } else {
        // eslint-disable-next-line
        Product.atualizar(this.product).then(resposta => {
          this.product = {}
          alert('O Produto foi ATUALIZADO em nossa base de dados com sucesso!')
          this.listar()
          this.erros = []
        }).catch(e => {
          this.erros = e.response.data.message
        })
      }

    },

    editar(product) {
      this.product = product
    },

    remover(product) {

      if (confirm('Deseja excluir o produto?')) {
        // eslint-disable-next-line
        Product.apagar(product).then(resposta => {
          alert('O Produto foi PAGADO em nossa base de dados com sucesso!')
          this.listar()
          this.erros = []
        }).catch(e => {
          this.erros = e.response.data.message
        })

      }

    }

  }

}


</script>

<style>

</style>
