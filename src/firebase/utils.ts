import {
	doc,
	setDoc,
	getDoc,
	collection,
	query,
	where,
	getDocs,
	updateDoc,
	arrayUnion,
	onSnapshot,
} from 'firebase/firestore';
import {db} from './config';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from './config';
import {toast} from 'react-hot-toast';

const addDocument = async (colName: string, docName: string, data: any) => {
	await setDoc(doc(db, colName, docName), data);
};

const getSimpleDocument = async (colName: string, docName: string) => {
	const docRef = doc(db, colName, docName);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('No such document!');
		return -1;
	}
};

const getMutipleDocuments = async (
	colName: string,
	fieldName: string,
	compare: any,
	valueFind: string,
	callback: any
) => {
	let response: any = [];
	const q = query(collection(db, colName), where(fieldName, compare, valueFind));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc: any) => {
		response.push(doc.data());
	});
	callback(response);
};

const updateArrayField = async (colName: string, docName: string, field: string, value: string) => {
	await updateDoc(doc(db, colName, docName), {
		[field]: arrayUnion(value),
	});
};

const updateField = async (colName: string, docName: string, field: string, value: string) => {
	await updateDoc(doc(db, colName, docName), {
		[field]: value,
	});
};

const listenDocument = (colName: string, docName: string, callback: any) => {
	onSnapshot(doc(db, colName, docName), (doc) => {
		callback(doc.data());
	});
};

const getCollection = async (colName: string, callback: any) => {
	let response: any = [];
	const querySnapshot = await getDocs(collection(db, colName));
	querySnapshot.forEach((doc) => {
		response.push(doc.data());
	});
	callback(response);
};

export const storageFileUpload = (file: any, type: string = 'img', callback: any) => {
	let folder = 'images';
	if (type === 'mp3') {
		folder = 'mp3';
	}
	const storageRef = ref(storage, `${folder}/${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);
	uploadTask.on(
		'state_changed',
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			// console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case 'paused':
					// console.log('Upload is paused');
					break;
				case 'running':
					// console.log('Upload is running');
					break;
			}
		},
		(error: any) => {
			toast.error(error.message);
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				callback(downloadURL.toString());
			});
		}
	);
};

export {
	addDocument,
	getSimpleDocument,
	getMutipleDocuments,
	updateArrayField,
	updateField,
	listenDocument,
	getCollection,
};
