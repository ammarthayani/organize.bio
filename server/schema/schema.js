const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = graphql;
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Institution = require('../models/institution');
const Folder = require('../models/folder');
const Template = require('../models/template');
const Form = require('../models/form');
const Question = require('../models/question');
const Answer = require('../models/answer');

//Defines fields for types that can be used on the graphql server
const UserType = new GraphQLObjectType({
	name   : 'User',
	fields : () => ({
		id          : { type: GraphQLID },
		name        : { type: GraphQLString },
		username    : { type: GraphQLString },
		email       : { type: GraphQLString },
		password    : { type: GraphQLString },
		institution : {
			type    : InstitutionType,
			resolve (parent, args) {
				return Institution.findById(parent.institutionId);
			}
		}
	})
});

const InstitutionType = new GraphQLObjectType({
	name   : 'Institution',
	fields : () => ({
		id    : { type: GraphQLID },
		name  : { type: GraphQLString },
		users : {
			type    : GraphQLList(UserType),
			resolve (parent, args) {
				return User.find({ institutionId: parent.id });
			}
		}
	})
});

const FolderType = new GraphQLObjectType({
	name   : 'Folder',
	fields : () => ({
		id        : { type: GraphQLID },
		name      : { type: GraphQLString },
		creator   : {
			type    : UserType,
			resolve (parent, args) {
				return User.findById(parent.creatorId);
			}
		},
		templates : {
			type    : GraphQLList(TemplateType),
			resolve (parent, args) {
				return Template.find({ folderId: parent.id });
			}
		}
	})
});

const TemplateType = new GraphQLObjectType({
	name   : 'Template',
	fields : () => ({
		id      : { type: GraphQLID },
		name    : { type: GraphQLString },
		folder  : {
			type    : FolderType,
			resolve (parent, args) {
				return Folder.findById(parent.folderId);
			}
		},
		forms   : {
			type    : GraphQLList(FormType),
			resolve (parent, args) {
				return Form.find({ templateId: parent.id });
			}
		},
		creator : {
			type    : UserType,
			resolve (parent, args) {
				return User.findById(parent.creatorId);
			}
		}
	})
});

const FormType = new GraphQLObjectType({
	name   : 'Form',
	fields : () => ({
		id       : { type: GraphQLID },
		name     : { type: GraphQLString },
		template : {
			type    : TemplateType,
			resolve (parent, args) {
				return Template.findById(parent.templateId);
			}
		},
		answers  : {
			type    : GraphQLList(AnswerType),
			resolve (parent, args) {
				return Answer.find({ formId: parent.id });
			}
		}
	})
});

const QuestionType = new GraphQLObjectType({
	name   : 'Question',
	fields : () => ({
		id       : { type: GraphQLID },
		name     : { type: GraphQLString },
		template : {
			type    : TemplateType,
			resolve (parent, args) {
				return Template.findById(parent.templateId);
			}
		}
	})
});

const AnswerType = new GraphQLObjectType({
	name   : 'Answer',
	fields : () => ({
		id       : { type: GraphQLID },
		name     : { type: GraphQLString },
		question : {
			type    : QuestionType,
			resolve (parent, args) {
				return Question.findById(parent.questionId);
			}
		},
		form     : {
			type    : FormType,
			resolve (parent, args) {
				return Form.findById(parent.formId);
			}
		}
	})
});

//defines what queries graphql can make
const RootQuery = new GraphQLObjectType({
	name   : 'RootQueryType',
	fields : {
		me                : {
			type    : UserType,
			args    : { token: { type: GraphQLString } },
			resolve : async (parent, args, { SECRET }) => {
				var currentUser;

				if (args.token) {
					try {
						const { user } = await jwt.verify(args.token, SECRET);
						currentUser = User.findById(user.id);
						console.log(currentUser);
						return currentUser;
					} catch (err) {
						console.log(err);
					}
					return currentUser;
				} else {
					currentUser = null;
					return currentUser;
				}
			}
		},
		institution       : {
			type    : InstitutionType,
			args    : { id: { type: GraphQLID } },
			resolve (parent, args) {
				//return _.find(institutions, { id: args.id })
				return Institution.findById(args.id);
			}
		},
		institutions      : {
			type    : new GraphQLList(InstitutionType),
			args    : { id: { type: GraphQLID } },
			resolve (parent, args) {
				//return institutions
				return Institution.find();
			}
		},
		users             : {
			type    : new GraphQLList(UserType),
			args    : { InstitutionId: { type: GraphQLID } },
			resolve (parent, args) {
				return User.find({ institutionId: args.InstitutionId });
			}
		},
		templatebyCreator : {
			type    : new GraphQLList(TemplateType),
			args    : { CreatorId: { type: GraphQLID } },
			resolve (parent, args) {
				return Template.find({ creatorId: args.CreatorId });
			}
		},
		templates         : {
			type    : new GraphQLList(TemplateType),
			resolve (parent, args) {
				return Template.find();
			}
		},
		folders           : {
			type    : new GraphQLList(FolderType),
			resolve (parent, args) {
				return Folder.find();
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name   : 'Mutation',
	fields : {
		addInstitution : {
			type    : InstitutionType,
			args    : {
				name : { type: GraphQLString }
			},
			resolve (parent, args) {
				let institution = new Institution({
					name : args.name
				});
				return institution.save();
			}
		},
		addUser        : {
			type    : UserType,
			args    : {
				name          : { type: GraphQLString },
				username      : { type: GraphQLString },
				email         : { type: GraphQLString },
				password      : { type: GraphQLString },
				institutionId : { type: GraphQLString }
			},
			resolve : async (parent, args) => {
				let user = new User({
					name          : args.name,
					username      : args.username,
					email         : args.email,
					password      : args.password,
					institutionId : args.institutionId
				});
				user.password = await bcrypt.hash(user.password, 12);
				return user.save();
			}
		},
		login          : {
			type    : GraphQLString,
			args    : {
				email    : { type: GraphQLString },
				password : { type: GraphQLString }
			},
			resolve : async (parent, { email, password }, { SECRET }) => {
				const user = await User.findOne({ email: email });
				console.log(email);
				console.log(user);
				if (!user) {
					throw new Error('No user with that email');
				}

				const valid = await bcrypt.compare(password, user.password);
				if (!valid) {
					throw new Error('Incorrect password');
				}

				const token = jwt.sign(
					{
						user : _.pick(user, [
							'id',
							'institutionId'
						])
					},
					SECRET,
					{
						expiresIn : '1y'
					}
				);

				return token;
			}
		},
		addTemplate    : {
			type    : TemplateType,
			args    : {
				name      : { type: GraphQLString },
				creatorId : { type: GraphQLString },
				folderId  : { type: GraphQLString }
			},
			resolve (parent, args) {
				let template = new Template({
					name      : args.name,
					creatorId : args.creatorId,
					folderId  : args.folderId
				});
				return template.save();
			}
		},
		addFolder      : {
			type    : FolderType,
			args    : {
				name      : { type: GraphQLString },
				creatorId : { type: GraphQLID }
			},
			resolve (parent, args) {
				let folder = new Folder({
					name      : args.name,
					creatorId : args.creatorId
				});
				return folder.save();
			}
		},
		addForm        : {
			type    : FormType,
			args    : {
				name       : { type: GraphQLString },
				templateId : { type: GraphQLID }
			},
			resolve (parent, args) {
				let form = new Form({
					name       : args.name,
					templateId : args.templateId
				});
				return form.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query    : RootQuery,
	mutation : Mutation
});
