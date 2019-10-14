
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from 'src/model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.page.html',
  styleUrls: ['./cliente-detalhes.page.scss'],
})
export class ClienteDetalhesPage implements OnInit {

  id : string;
  formGroup : FormGroup;
  cliente : Cliente = new Cliente();

  constructor(private actRoute : ActivatedRoute,
    private formB : FormBuilder,
    private db: AngularFirestore,
    private toastCtrl : ToastController,
    private router : Router,
    private alertController : AlertController) { 

      this.id = this.actRoute.snapshot.paramMap.get('id');

      this.formGroup = this.formB.group({
        nome : [],
        telefone : [],
        email : [],
      })
    }

  ngOnInit() {

    // Carregar os dados do cliente selecionado
    this.db.collection("clientes") //Seleciona a coleção cliente
    .doc(this.id).get().subscribe(response=>{ //.doc seleciona o cliente com base
      //Atribuindo os dados do response para a variável cliente
      
      this.cliente.id = this.id;
      this.cliente.nome = response.data().nome;
      this.cliente.email = response.data().email;
      this.cliente.telefone = response.data().telefone;
    })
  }

  atualizar(){
    //Atualiza os dados do cliente
    this.db.collection('clientes')// selecina a coleção cliente
    .doc(this.cliente.id)//seleciona pelo ID do cliente
    .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
    .then(() =>{
      this.presentToast();
    }).catch(()=>{
      console.log('Erro ao Atualizar');
    })
  }

  excluir(){
    this.db.collection('clientes')//selecina a coleção cliente
    .doc(this.cliente.id).delete().then(()=>{
      this.router.navigate(['home']); //redireciona parao home
    })
  }

  async presentToast(){
    const toast = await this.toastCtrl.create({
      message : 'Atualizado com sucesso',
      duration : 2000
    });
    toast.present();
  }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja excluir ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          
          }
        }, {
          text: 'Sim',
          handler: () => {
           this.excluir();
          }
        }
      ]
    });

    await alert.present();
  }

}

 