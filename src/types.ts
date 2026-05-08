export enum Role {
    Student = 'Student',
    Tutor = 'Tutor',
    HOD = 'HOD',
    EducationManager = 'Education Manager',
    SystemAdministrator = 'System Administrator',
    StudentService = 'Student Service',
    Dean = 'Dean'
}

export interface User {
    id: string; // Employee ID or College ID
    name: string;
    email: string;
    role: Role | string;
    programId?: string;
    year?: number;
    password?: string;
    profilePicture?: string;
}

export interface Module {
    code: string;
    title: string;
    programTitle: string;
    year: number;
    sem: number;
    type: string;
    category?: string;
}
