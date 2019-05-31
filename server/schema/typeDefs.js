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
		users: [User]
		usersByInstitution(InstitutionId: ID!): [User]
		institution: Institution
		institutions: [Institution]
		templates: [Template]
		templatesByInstitution(InstitutionId: ID!): [Template]
		templatesByCreator(CreatorID: ID!): [Template]
		folders: [Folder]
		foldersByInsitution(InstitutionId: ID!): [Folder]
		foldersByCreator(CreatorID: ID!): [Folder]
		forms(TemplateId: ID!): [Form]
		questions(TemplateId: ID!): [Question]
		answers(FormId: ID!): [Answer]
		me(token: String): [User]
	}

	type Mutation {
		addInstitution(name: String!): Institution
		addUser(name: String, username: String, email: String, password: String, institutionId: ID): User
		login(username: String, password: String): String
		addTemplate(name: String, CreatorId: ID, FolderId: ID): Template
		addFolder(name: String, CreatorId: ID): Folder
		addForm(name: String, TemplateId: ID): Form
		addQuestion(name: String, TemplateId: ID): Question
		addAnswer(name: String, FormId: ID, QuestionId: ID): Answer
	}
`;

module.exports = typeDefs;
