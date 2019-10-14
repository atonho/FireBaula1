import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Cliente } from 'src/model/cliente';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listaCliente : Cliente[] = []; // Variável para armazenar os clientes (Array)

  constructor(private db: AngularFirestore, // Módulo de banco de dados
    private router : Router) {

    
  }

  goPage(idValue : string){
    this.router.navigate(['cliente-detalhes',{id : idValue}]);
  }

  ngOnInit(){
    this.db.collection('clientes').snapshotChanges().subscribe(response=>{ // Solicita os dados da coleção clientes no Firebase
      // response retorna um objeto do firebase, precisamos converter em um objeto cliente

      this.listaCliente = []; // limpando a lista

      response.forEach(doc=>{ // forEach equivalente ao for, percorre todos os elementos do firebase
              // cada um se chama doc, ou seja, converter um doc em cliente.

        let c = new Cliente(); // Cria um novo objeto cliente 
        c.setCliente(doc.payload.doc.data(),doc.payload.doc.id); // Coloca os dados do doc em clientes

        this.listaCliente.push(c); // Adiciona este cliente a lista
        
       },err=>{ // Em caso de erro, executa essa linha
        console.log(err);
      })
    })
  }

}
