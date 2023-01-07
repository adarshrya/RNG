import { TodoCreateInput } from "../dto/Todo";
import http from "../http-common";

export async function getAllTodo() {
    return http.get<Array<TodoCreateInput>>("/todo");
}

export async function createTodo(todo: TodoCreateInput) {
    return http.post<TodoCreateInput>("/todo", todo);
}

export async function deleteTodo(id: string | undefined) {
    return http.delete<TodoCreateInput>("/todo/" + id);
}

export async function saveTodo(id: string | undefined, msg: string) {
    return http.put<TodoCreateInput>("/todo/" + id + "/edit", { text: msg });
}
export async function doneTodo(id: string | undefined, done: boolean) {
    return http.put<TodoCreateInput>("/todo/" + id + "/done", { done: done });
}


