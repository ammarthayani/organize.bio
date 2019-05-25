// 1
import {User} from './types/user'
import gql from 'graphql-tag'

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
//`query me($token: String){me(token:$token){username email}}`
// 3
export interface AllUserQueryResponse {
  users: User[];
}

export interface MeQueryResponse {
  me: User;
}

export interface LoginResponse {
  token: String;
}