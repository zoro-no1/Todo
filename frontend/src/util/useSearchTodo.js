import todoStore from "../store/todoStore";


const {getTodo, filterTodo}=todoStore()


export default function searchTodo(filter,active){
    if (filter == "All") {
        if(active=="All"){
          getTodo()
          return
        }
        filterTodo(`status=${active}`);
      } else {
        if(active=="All"){
          filterTodo(`priority=${filter}`)
          return
        }
        filterTodo(`priority=${filter}`,`status=${active}`);

      }
}