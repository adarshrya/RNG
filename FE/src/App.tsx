import React from 'react';
import { getAllTodo, createTodo, deleteTodo, saveTodo, doneTodo, todoAll } from './service/TodoService';
import { TodoCreateInput } from './dto/Todo';

class App extends React.Component<{}, { tutorials: Array<TodoCreateInput>, NewTodo: string, All: boolean }> {

  constructor(props: any) {
    super(props);
    this.state = { tutorials: [], NewTodo: "", All: true };
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    getAllTodo().then((response: any) => {
      this.setState({
        tutorials: response.data,
        NewTodo: ""
      });
      this.HasAll();
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handleAdd(e: any) {
    if (e.key === 'Enter' && this.state.NewTodo !== '') {
      // 👇 Get input value
      let dev = this.state.tutorials;
      createTodo({
        created_at: new Date(),
        done: false,
        text: this.state.NewTodo
      }).then((response: any) => {
        dev.unshift(response.data)
        this.setState({ tutorials: dev });
        this.HasAll();
      })
        .catch((e: Error) => {
          console.log(e);
        });
    }

  }

  handleDelete(id: string | undefined) {
    let dev = this.state.tutorials;

    deleteTodo(id).then((response: any) => {
      this.setState({ tutorials: dev.filter((x) => x.uid !== id) });
      this.HasAll();
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handleSave(id: string | undefined) {
    let dev = this.state.tutorials.filter((d) => d.uid === id)[0];
    if (dev.text !== '') {
      saveTodo(id, dev.text).then((response: any) => {
      }).catch((e: Error) => {
        console.log(e);
      });
    }
  }

  HasAll() {
    let dev = this.state.tutorials.filter((d) => d.done === false);
    if (dev.length < 1) {
      this.setState({ All: true });
    } else {
      this.setState({ All: false });
    }
  }

  handleMarkAll() {
    let all = this.state.All;
    todoAll(!all).then((response: any) => {
      let todo = this.state.tutorials;
      todo.forEach(element => {

        element.done = !all

      });
      this.setState({ tutorials: todo });
      this.setState({ All: !all });
    })
      .catch((e: Error) => {
        console.log(e);
      });

  }

  handleDone(id: string | undefined) {
    let todo = this.state.tutorials;
    let dev = this.state.tutorials.filter((d) => d.uid === id)[0];
    doneTodo(id, !dev.done).then((response: any) => {
      todo.forEach(element => {
        if (element.uid === id) {
          element.done = !dev.done
        }
      });
      this.setState({ tutorials: todo });
      this.HasAll();
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
      <div className="container mx-auto px-4 mt-5">
        <div className="flex justify-end bg-white rounded-xl" >
          <button onClick={() => this.handleMarkAll()} className="flex-none">
            {!this.state.All &&
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>}
            {this.state.All &&
              <svg className="h-8 w-8 text-blue-500" width="24" height="24" viewBox="0 0 24 24"
                strokeWidth="2" stroke="currentColor" fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>}
          </button>
          <input name="text" type="text"
            value={this.state.NewTodo}
            onChange={this.handleChange}
            onKeyDown={this.handleAdd}
            aria-label="Add todo"
            placeholder="+ tap to add a todo"
            className='w-[95%] border-transparent rounded-xl' autoComplete='off' />
        </div>
        {this.state.tutorials &&
          this.state.tutorials.map((tutorial: TodoCreateInput, index: number) => (
            <div key={index} className="flex justify-center bg-white rounded-lg my-2" >
              <button onClick={() => this.handleDone(tutorial.uid)} className="flex-none ml-2">
                {tutorial.done &&
                  <svg className="h-8 w-8 text-blue-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="2" />  <path d="M9 12l2 2l4 -4" /></svg>
                }{!tutorial.done &&
                  <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
                }
              </button>
              <input autoComplete='off' aria-label="Edit todo"
                className={`grow mx-3 w-full border-transparent${tutorial.done ? " line-through" : ""}`}
                type="text" name="text"
                value={tutorial.text}
                disabled={(tutorial.done)}
                onChange={(event) => this.handleChangeTxt(event, tutorial.uid)}
              />
              {!tutorial.done && <button aria-label="Save todo" onClick={() => this.handleSave(tutorial.uid)}
                className="flex-none mr-2">
                <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
              </button>}
              <button onClick={() => this.handleDelete(tutorial.uid)} className="flex-none mr-2 "><svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg></button>
            </div>
          ))}

      </div>

    );
  }

}

export default App;
