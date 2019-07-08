// 1
import {User} from './types/user'
import {Folder} from './types/folder'
import gql from 'graphql-tag'
import { Template } from './types/template';

// 2
export const ALL_USERS_QUERY = gql`
query users($institutionId:ID){
  users(InstitutionId:$institutionId) {
    id
    name
    username
    email
    institution{
      id
      name
    }
  }
  
}
`;

export const FOLDERS_QUERY = gql`
query foldersbyCreator($creatorId:ID!){
  foldersByCreator(CreatorId:$creatorId){
    name
    templates{
      name
    }
  }
}
`

export const LOGIN_MUTATION = gql`
mutation login($Username: String, $Password: String) {
  login(Username: $Username, Password: $Password)
}
`;
// 3
export interface AllUserQueryResponse {
  users: User[];
}

export interface TemplateResponse {
  template: Template
}

export interface MeQueryResponse {
  me: User;
}

export interface LoginResponse {
  token: String;
}

export interface FolderResponse{
  folder: Folder
}

export interface FoldersResponse{
  folders: Folder[];
}
