import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

const useFirestoreCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const querySnapshot = await getDocs(collection(db, collectionName));
                const documents = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(documents); // Set the data
            } catch (err) {
                setError(err); // Set the error if there's an issue
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchData();
    }, [collectionName]); // Refetch if the collectionName changes

    return { data, loading, error };
};

export default useFirestoreCollection;
