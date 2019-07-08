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
const Graph = require('../models/graph')

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
		creator (parent) {
			return User.findById(parent.creatorId);
		},
		templates (parent) {
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
		},
		questions (parent){
			return Question.find({templateId: parent.id})
		}
	},
	Form        : {
		template (parent) {
			return Template.findById(parent.templateId);
		},
		answers (parent) {
			return Answer.find({ formId: parent.id });
		}
	},
	Question    : {
		template (parent) {
			return Template.findById(parent.templateId);
		}
	},
	Answer      : {
		question (parent) {
			return Question.findById(parent.questionId);
		},
		form (parent) {
			return Form.findById(parent.formId);
		}
	},
	Query       : {
		me: async (parent, { token }, { SECRET }) => {
			var currentUser;

			if (token) {
				try {
					const { user } = await jwt.verify(token, SECRET);
					console.log(user.id);
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
		template(_,{TemplateId}){
			return Template.findById(TemplateId)
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
		folder(parent, {FolderId}){
			console.log(FolderId)
			return Folder.findById(FolderId)
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
		addUser: async(_, {Name, Username, Email, Password, InstitutionId}) => {
			let user = new User({
				name:Name,
				username:Username,
				email: Email,
				password:Password,
				institutionId:InstitutionId
			})
			user.password = await bcrypt.hash(Password, 12);
				return user.save();
		},
		login: async (parent,{Username, Password}, {SECRET}) => {
			console.log(Username)
			const user = await User.findOne({ username: Username });
			console.log(user)
				if (!user) {
					throw new Error('No user with that username');
				}

				const valid = await bcrypt.compare(Password, user.password);
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

}
},
};

module.exports = resolvers;
