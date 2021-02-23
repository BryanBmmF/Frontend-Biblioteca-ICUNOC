/**
 * Clase para manejar tokens de autenticacion
 */
export class JwtDTO {
    token: string;
    type: string;
    nombreUsuario: string;
    authorities: string[];
}
