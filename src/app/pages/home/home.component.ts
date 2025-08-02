import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuarioModel';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { AuditoriaService } from '../../services/auditoria.service';
import * as XLSX from 'xlsx'
import { RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios: UsuarioModel[] = []
  usuariosGeral: UsuarioModel[] = []

  constructor(private usuarioService: UsuarioService,
     private toastr: ToastrService, private auditoriaService : AuditoriaService,
     private autenticacaoService: AutenticacaoService
    ) {}

  ngOnInit(): void {
    this.usuarioService.BuscarUsuarios().subscribe(response => {
      console.log(response)
      this.usuarios = response.dados
      this.usuariosGeral = response.dados
    })
  }
   remover(id:number){
      this.usuarioService.RemoverUsuario(id).subscribe(response => {
          if(response.dados != null){
             this.toastr.success(response.mensagem, "Successo!")
             this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)

          }else{
             this.toastr.error(response.mensagem, "Error!")
          }

      })
   }
   pesquisar(event:Event){
        const target = event.target as HTMLInputElement;
        const value = target.value.toLowerCase();

        this.usuarios = this.usuariosGeral.filter(usuario => {
           return usuario.nome.toLowerCase().includes(value)
        })
   }

   exportarExcel(){
      this.auditoriaService.BuscarAuditorias().subscribe(response =>  {
            if(response.length > 0) {
                 const ws : XLSX.WorkSheet = XLSX.utils.json_to_sheet(response);
                 const wb : XLSX.WorkBook = XLSX.utils.book_new();
                 XLSX.utils.book_append_sheet(wb, ws, "Planilha de Dados");
                 XLSX.writeFile(wb, 'dados.xlsx');
            }else{
               this.toastr.error("Não existe auditorias cadastadas!", "Error!")
            }
      })

   }

   deslogar(){
     this.autenticacaoService.Sair();
   }

}
