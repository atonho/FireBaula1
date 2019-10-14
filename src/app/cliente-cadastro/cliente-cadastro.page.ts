import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.page.html',
  styleUrls: ['./cliente-cadastro.page.scss'],
})
export class ClienteCadastroPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
cadastrar(){
  this.describe.collection('clientes') //seleciona a coleção de firebase
  .add(this.formGroup.value).then()=.{ // .add realliza o cadastro, os dddos do formulário
    this.presentToast(); //dados cadastrado com sucesso
  }).catch(())=>{
    console.log("Erro ao cadastrar!") //Erro
  })
// then --> sucesso
// catch -> erro
   }
   
  }
}