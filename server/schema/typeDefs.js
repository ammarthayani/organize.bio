const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
	type Institution {
		id: ID
		name: String
		users: [User]
	}

	type User {
		id: ID
		name: String
		username: String
		email: String
		password: String
		institution: Institution
		createdFolders: [Folder]
		createdTemplates: [Template]
	}

	type Folder {
		id: ID
		name: String
		creator: User
		templates: [Template]
	}

	type Template {
		id: ID
		name: String
		folder: Folder
		forms: [Form]
		questions: [Question]
		creator: User
	}

	type Form {
		id: ID
		template: Template
		answers: [Answer]
	}

	type Question {
		id: ID
		name: String
		template: Template
		answers: [Answer]
	}

	type Answer {
		id: ID
		name: String
		question: Question
		form: Form
	}

	type Query {
		me(token: String): User
		institution(InstitutionId: ID!): Institution
		institutions: [Institution]
		users: [User]
		usersByInstitution(InstitutionId: ID!): [User]
		template(TemplateId:ID):Template
		templates: [Template]
		templatesByCreator(CreatorId: ID!): [Template]
		folders: [Folder]
		foldersByCreator(CreatorId: ID!): [Folder]
		folder(FolderId: ID): Folder
		forms(TemplateId: ID!): [Form]
		questions(TemplateId: ID!): [Question]
		answers(FormId: ID!): [Answer]
	}

	type Mutation {
		addInstitution(Name: String!): Institution
		addUser(Name: String, Username: String, Email: String, Password: String, InstitutionId: ID): User
		login(Username: String, Password: String): String
		addTemplate(Name: String, CreatorId: ID, FolderId: ID): Template
		addFolder(Name: String, CreatorId: ID): Folder
		addForm(Name: String, TemplateId: ID): Form
		addQuestion(Name: String, TemplateId: ID): Question
		addAnswer(Name: String, FormId: ID, QuestionId: ID): Answer
	}

	type Subscriptions {
		folderAdded(CreatorId: String): Folder
	}
`;

module.exports = typeDefs;
