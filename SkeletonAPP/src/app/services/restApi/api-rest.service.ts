import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/empresas';
  
  // Obtener todos las empresas
  getEmpresas(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.apiUrl);
  }

  // Crear una nueva empresa:
  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.apiUrl, empresa);
  }

  // Actualizar empresa:
  updateEmpresa(empresa: any): Observable<any> {
    return this.httpClient.put<Empresa>(`${this.apiUrl}/${empresa.id}`, empresa);
  }

  // Eliminar una empresa por uid:
  deleteEmpresa(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
