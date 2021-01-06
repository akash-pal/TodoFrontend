import React, { Component } from "react";
import { Table, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class HomeComponent extends Component {
  addTodo = () => {
    this.props.history.push("/add");
  };

  render() {
    const { todos, deleteTodo, editTodo, updateStatus } = this.props;
    return (
      <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Todo List</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/add">Add Todo</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Title</th>
              <th>Bucket</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos && todos.map((todo, id) => (
              <tr key={todo._id}>
                <th scope="row">{id + 1}</th>
                <td>
                  <input type="checkbox"
                    onChange={() => updateStatus(todo._id, !todo?.status)}
                    defaultChecked={todo?.status} />
                </td>
                <td>{todo?.name}</td>
                <td>{todo?.bucket?.name}</td>
                <td>
                  <button type="button" onClick={() => editTodo(todo)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteTodo(todo._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </>
    );
  }
}

export default HomeComponent;
