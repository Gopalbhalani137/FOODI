import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAxiosSecure } from '../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleDelete = async (user) => {
    try {
      const res = await axiosSecure.delete(`/users/${user._id}`);
      if (res.status !== 200) {
        throw new Error('Failed to delete user');
      }
      queryClient.invalidateQueries('users');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdmin = async (user) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${user._id}`);
      if (res.status !== 200) {
        throw new Error('Failed to make admin');
      }
      queryClient.invalidateQueries('users');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-[770px]">
          <thead>
            <tr className='bg-yellow text-white'>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? "Admin" : (
                    <button onClick={() => handleAdmin(user)}>
                      <FaUser />
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(user)}><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
