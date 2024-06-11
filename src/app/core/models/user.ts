import { Group } from './group';

export interface User {
	id: number;
	nama: string;
	password: string;
	email: string;
	group: Group;
	createdAt?: string;
	createdBy?: any;
	updateAt?: string;
	updatedBy?: any;
}
