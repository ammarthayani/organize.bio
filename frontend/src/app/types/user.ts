import {Institution} from './institution'
import { Folder } from './folder';

export class User {
    id: string;
    name: string;
    username: string;
    email: string;
    institution: Institution;
    createdFolders: Folder[]
  }