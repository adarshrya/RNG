import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllTodo } from './service/TodoService';
import { TodoCreateInput } from './dto/Todo';

class App extends React.Component<{}, { tutorials: Array<TodoCreateInput>,NewTodo:string }> {

  constructor(props: any) {
    super(props);
    this.state = {tutorials: [],NewTodo:""};
 
  }
  componentDidMount() {
    getAllTodo().then((response: any) => {
      this.setState({
        tutorials: response.data,
        NewTodo:""
      });
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  handleAdd() {
    console.log('this is:', this);
  }
 
  render() { 
     

    return (
    <div className="App">
      <header className="App-header">  
        <ul className="list-group">
            { this.state.tutorials &&
               this.state.tutorials.map((tutorial: TodoCreateInput, index: number) => (
                <li> 
                  {tutorial.text}
                </li>
              ))}
          </ul> 
      </header>
    </div>
  );}
 
}

export default App;
