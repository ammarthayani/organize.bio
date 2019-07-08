import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FOLDERS_QUERY, FoldersResponse, TemplateResponse } from '../graphql';
import { AuthService } from '../services/auth.service';
import { FolderResponse } from '../graphql';
import gql from 'graphql-tag';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	id: String;
	templateId: String;
	constructor (private apollo: Apollo, private authService: AuthService) {}

	getFolders (creatorId) {
		return this.apollo.watchQuery<FoldersResponse>({
			query: FOLDERS_QUERY,
			variables: {
				creatorId: creatorId
			}
		});
	}

	getFolder (FolderId) {
		return this.apollo.watchQuery<FolderResponse>({
			query: gql`
				query folder($FolderId: ID) {
					folder(FolderId: $FolderId) {
						name
						templates {
							id
							name
						}
					}
				}
			`,
			variables: {
				FolderId: FolderId
			}
		});
	}

	getTemplate (TemplateId) {
		return this.apollo.watchQuery<TemplateResponse>({
			query: gql`
				query template($TemplateId: ID) {
					template(TemplateId: $TemplateId) {
						name
						id
						name
						questions {
							name
						}
						forms {
							id
							answers{
								name
							}
						}
					}
				}
			`,
			variables: {
				TemplateId: TemplateId
			}
		});
	}

	addFolder (folder) {
		return this.apollo.mutate({
			mutation: gql`
				mutation addFolder($name: String, $creatorid: ID) {
					addFolder(Name: $name, CreatorId: $creatorid) {
						name
					}
				}
			`,

			variables: {
				name: folder.name,
				creatorid: folder.creatorId
			}
		});
	}

	addTemplate (template) {
		return this.apollo.mutate({
			mutation: gql`
				mutation addTemplate($Name: String, $FolderId: ID, $CreatorId: ID) {
					addTemplate(Name: $Name, FolderId: $FolderId, CreatorId: $CreatorId) {
						name
					}
				}
			`,
			variables: {
				Name: template.name,
				FolderId: template.folderId,
				CreatorId: template.creatorId
			}
		});
	}
}
