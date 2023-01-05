import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllTodo, createTodo, deleteTodo, saveTodo, doneTodo } from './service/TodoService';
import { TodoCreateInput } from './dto/Todo';

class App extends React.Component<{}, { tutorials: Array<TodoCreateInput>, NewTodo: string }> {

  constructor(props: any) {
    super(props);
    this.state = { tutorials: [], NewTodo: "" };
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    getAllTodo().then((response: any) => {
      this.setState({
        tutorials: response.data,
        NewTodo: ""
      });
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handleAdd(e: any) {
    e.preventDefault();
    let dev = this.state.tutorials;
    createTodo({
      created_at: new Date(),
      done: false,
      text: this.state.NewTodo
    }).then((response: any) => {
      dev.unshift(response.data)
      this.setState({ tutorials: dev });
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handleDelete(id: string | undefined) {
    let dev = this.state.tutorials;

    deleteTodo(id).then((response: any) => {
      this.setState({ tutorials: dev.filter((x) => x.uid !== id) });
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handleSave(id: string | undefined) {
    let dev = this.state.tutorials.filter((d) => d.uid === id)[0];
    saveTodo(id, dev.text).then((response: any) => {
    }).catch((e: Error) => {
      console.log(e);
    });
  }

  handleDone(id: string | undefined) {
    let todo = this.state.tutorials;
    doneTodo(id).then((response: any) => {
      todo.forEach(element => {
        if (element.uid === id) {
          element.done = true
        }
      });
      this.setState({ tutorials: todo });
    }).catch((e: Error) => {
      console.log(e);
    });
  }

  handleChange = (e: any) => {
    this.setState({ NewTodo: e.target.value });
  }

  handleChangeTxt = (e: any, id: string | undefined) => {
    let todo = this.state.tutorials;
    todo.forEach(element => {
      if (element.uid === id) {
        element.text = e.target.value
      }
    });
    this.setState({ tutorials: todo });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form autoComplete='off' onSubmit={this.handleAdd}  >
            <input name="text" value={this.state.NewTodo}
              onChange={this.handleChange} aria-label="Add todo" placeholder="+ tap to add a todo" />
          </form>

          {this.state.tutorials &&
            this.state.tutorials.map((tutorial: TodoCreateInput, index: number) => (
              <div key="{index}" >
                {tutorial.done ? 'Yes' : 'No'}
                <button onClick={() => this.handleDone(tutorial.uid)} >Done</button>
                <input aria-label="Edit todo" type="text" name="text" value={tutorial.text}
                  onChange={(event) => this.handleChangeTxt(event, tutorial.uid)}
                />
                <button aria-label="Save todo" onClick={() => this.handleSave(tutorial.uid)}>Save</button>
                <button onClick={() => this.handleDelete(tutorial.uid)}>Delete</button>
              </div>
            ))}

        </header>
      </div>
    );
  }

}

export default App;
