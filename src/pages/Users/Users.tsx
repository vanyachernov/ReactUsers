import UserTable from "../../components/UserTable/UserTable";
import ConfirmDialog from "../../components/Dialogs/Confirm.tsx";
import {useUsers} from "../../hooks/useUser.ts";
import {useState} from "react";
import "./Users.css"

function Users() {
  const { data: users, isLoading, error } = useUsers();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDeleteConfirm = () => {
      if (deleteId !== null) {
          console.log('Confirmed delete:', deleteId);
          
          // TODO: deleting via TanStack Query mutation.
          
          setDeleteId(null);
      }
  };

  if (isLoading) {
      return <div>Loading...</div>;
  }
    
  if (error) {
      return <div>Error loading users</div>;
  }
    
  return (
      <>
          <div>
              <h1>User Management</h1>
              <UserTable
                  users={users || []}
                  onEdit={(user) => console.log('Edit:', user)}
                  onDelete={(id) => console.log('Delete:', id)}
              />
          </div>
          <ConfirmDialog
              open={deleteId !== null}
              onClose={() => setDeleteId(null)}
              onConfirm={handleDeleteConfirm}
              title="Підтвердити видалення"
              content="Ви впевнені, що хочете видалити цього користувача?"
          />

      </>
  );
}

export default Users
