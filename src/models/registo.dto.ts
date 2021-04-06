export interface RegistoDTO {
    id: string;
    nome: string;
    morada: string;
    contacto1: string,
    contacto2?: string,
    registadoPor?: string;
    email?: string;
    estado: string;
    password: string;
    perfil:string;
}