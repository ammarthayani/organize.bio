const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const User = require('../models/user');
const Institution = require('../models/institution');
const Folder = require('../models/folder');
const Template = require('../models/template');
const Form = require('../models/form');
const Question = require('../models/question');
const Answer = require('../models/answer');

const resolvers = {
	User        : {
		institution (parent) {
			return Institution.findById(parent.institutionId);
		},
		createdFolders (parent) {
			return Folder.find({ creatorId: parent.id });
		},
		createdTemplates (parent) {
			return Template.find({ creatorId: parent.id });
		}
	},
	Institution : {
		users (parent) {
			return User.find({ institutionId: parent.id });
		}
	},
	Folder      : {
		creator () {
			return User.findById(parent.creatorId);
		},
		templates () {
			return Template.find({ folderId: parent.id });
		}
	},
	Template    : {
		folder (parent) {
			return Folder.findById(parent.folderId);
		},
		forms (parent) {
			return Form.find({ templateId: parent.id });
		},
		creator (parent) {
			return User.findById(parent.creatorId);
		}
	},
	Form        : {
		template () {
			return Template.findById(parent.templateId);
		},
		answers () {
			return Answer.find({ formId: parent.id });
		}
	},
	Question    : {
		template () {
			return Template.findById(parent.templateId);
		}
	},
	Answer      : {
		question () {
			return Question.findById(parent.questionId);
		},
		form () {
			return Form.findById(parent.formId);
		}
	},
	Query       : {
		me: async (parent, { token }, { SECRET }) => {
			var currentUser;

			if (token) {
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
		},
		institution (_, { InstitutionId }) {
			return Institution.findById(InstitutionId);
		},
		institutions () {
			return Institution.find();
		},
		users () {
			return User.find();
		},
		usersByInstitution (_, { InstitutionId }) {
			return User.find({ institutionId: InstitutionId });
		},
		templates () {
			return Template.find();
		},
		templatesByCreator (_, { CreatorId }) {
			return Template.find({ creatorId: CreatorId });
		},
		folders () {
			return Folder.find();
		},
		foldersByCreator (_, { CreatorId }) {
			return Folder.find({ creatorId: CreatorId });
		},
		forms (_, { TemplateId }) {
			return Form.find({ templateId: TemplateId });
		},
		questions (_, { TemplateId }) {
			return Question.find({ templateId: TemplateId });
		},
		answers (_, { FormId }) {
			return Form.find({ formId: FormId });
		}
	},
	Mutation:{
		addInstitution(_, {Name}){
			let institution = new Institution({
				name: Name
			})
			return institution.save()
			
		},
		addUser(_, {Name, Username, Email, Password}){
			let user = new User({
				name:Name,
				username:Username,
				email: Email,
				password:Password
			})
			return user.save()
		},
		login: async (_,{Username, Password}, {SECRET}) => {
			const user = await User.findOne({ username: Username });
				if (!user) {
					throw new Error('No user with that username');
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
		},
		addTemplate (_,{Name,CreatorId,FolderId}){
			let template = new Template({
				name      : Name,
				creatorId : CreatorId,
				folderId  : FolderId
			});
			return template.save();
		},
		addFolder (_, {Name, CreatorId}){
			let folder = new Folder({
				name      : Name,
				creatorId : CreatorId,
			});
			return folder.save();
		},
		addForm (_, {Name, TemplateId}){
			let form = new Form({
				name       : Name,
				templateId : TemplateId
			});
			return form.save();
		},
		addQuestion (_, {Name, TemplateId}){
			let question = new Question({
				name       : Name,
				templateId : TemplateId
			});
			return question.save();
	},
		addAnswer (_, {Name, FormId, QuestionId}){
			let answer = new Answer({
				name       : Name,
				formId : FormId,
				questionId: QuestionId
			})
			return answer.save();

}}
};

module.exports = resolvers;
