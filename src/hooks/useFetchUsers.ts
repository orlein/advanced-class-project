import { useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
}

export function useFetchUsers(userIds: string[]) {
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userIds.length === 0) {
      setUsers({});
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('accessToken');
        const headers = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        });
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        const promises = userIds.map(async (id) => {
          const response = await fetch(`https://ozadv6.beavercoding.net/api/accounts/${id}`, {
            headers,
          });
          if (!response.ok) {
            console.error(`Failed to fetch user ${id}:`, response.statusText);
            return null;
          }
          const data = await response.json();
          return {
            id,
            data: data as User,
          };
        });

        const results = await Promise.all(promises);
        const usersMap: { [key: string]: User } = {};
        results.forEach((result) => {
          if (result && result.data) {
            usersMap[result.id] = result.data;
          }
        });

        setUsers(usersMap);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userIds]);

  return { users, loading };
}
