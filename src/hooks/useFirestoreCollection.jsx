import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { onSnapshot } from 'firebase/firestore';

const useFirestoreCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, collectionName),
            (querySnapshot) => {
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(documents); // Set the real-time data
                setLoading(false); // End loading
            },
            (err) => {
                setError(err); // Set the error if there's an issue
                setLoading(false); // End loading
            }
        );

        // Cleanup listener when component is unmounted
        return () => unsubscribe();
    }, [collectionName]); // Refetch if the collectionName changes

    return { data, loading, error };
};

export default useFirestoreCollection;
