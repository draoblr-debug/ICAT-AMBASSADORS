import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const isProd = process.env.NODE_ENV === 'production';
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: isProd ? '[REDACTED]' : auth.currentUser?.uid,
      email: isProd ? '[REDACTED]' : auth.currentUser?.email,
    },
    operationType,
    path
  }
  if (!isProd) {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  } else {
    console.error(`Firestore Error [${operationType}] on ${path}:`, error instanceof Error ? error.message : String(error));
  }
  throw new Error(JSON.stringify(errInfo));
}
