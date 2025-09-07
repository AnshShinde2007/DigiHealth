import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function Admin() {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${API_URL}/admin/users`).then(response => {
      setUsers(response.data);
    });
  };

  const handleDelete = (userId) => {
    axios.delete(`${API_URL}/admin/users/${userId}`).then(() => {
      fetchUsers(); // Refresh the user list
    });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setNewRole(user.role);
    setShowEditModal(true);
  };

  const handleSaveRole = () => {
    axios.put(`${API_URL}/admin/users/${currentUser.id}?role=${newRole}`).then(() => {
      fetchUsers(); // Refresh the user list
      setShowEditModal(false);
    });
  };

  return (
    <Container>
      <h1>Admin Panel</h1>
      <h2>User Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Auth0 ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.auth0_id}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewRole">
              <Form.Label>New Role</Form.Label>
              <Form.Control as="select" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option>Migrant</option>
                <option>Health Worker</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveRole}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
