export interface IUser {
    id: number;               // ID único del usuario
    nombreUsuario: any;             // Nombre de usuario
    descripcion: string;            // descripcion del usuario
    person_id: number;        // Relación con la entidad 'Person'
    person: IPerson;    // Información personal, puede ser null
  }
  
  export interface IPerson {
    id: number;               // ID único de la persona
    nombreUsuario?: string | null | undefined;     // Nombre de la persona, opcional o null
    descripcion?: string | null | undefined; // Apellido de la persona, opcional o null 
    photo?: string | null | undefined;    // URL de la foto, opcional o null
  }
  