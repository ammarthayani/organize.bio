import { User } from './user';
import { Folder } from './folder';
import { Form } from './form';
import { Question } from './question';

export class Template{
    id: String;
    name:String;
    creator: User
    folder: Folder;
    forms: Form[];
    questions: Question[]
}