const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
	type Institution {
		id: ID
		name: String
		users: [User]
	},

	type User {
		id: ID
		name: String
		username: String
		email: String
		password: String
		institution: Institution
	},

    type Folder {
        id: ID
        name: String
        creator: User
        templates: [Template]
    },
    type Template {
        id: ID
        name: String
        folder: Folder
        forms: [Form]
        questions: [Question]
    },

    type Form {
        id: ID
        template: Template
        answers: [Answer]
    },
    type Question {
        id: ID
        name: String
        template: Template
        answers:[Answer]
    }
    type Answer {
        id: ID
        name: String
        question: Question
        form: Form
    }
	type Query {
		users: [User],
        usersByInstitution(InstitutionId: ID!): [User]
	}
`;

module.exports = typeDefs;
