import UserTable from "../../components/UserTable/UserTable.tsx";
import {useUsers} from "../../hooks/useUser.ts";
import "./Users.css"

function Users() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
      <div>
        <h1>User Management</h1>
        <UserTable
            users={users || []}
            onEdit={(user) => console.log('Edit:', user)}
            onDelete={(id) => console.log('Delete:', id)}
        />
      </div>
  );
}

export default Users
