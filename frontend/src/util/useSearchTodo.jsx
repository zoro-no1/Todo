import todoStore from "../store/todoStore";




export default function searchTodo(){
  const {getTodo, filterTodo}=todoStore()
  
 function searchTool(filter,active){
  console.log(filter,active);
  
  if (filter === "All") {
    if (active === "All") {
      getTodo(); // Fetch all todos
      return;
    }
    filterTodo(`status=${active}`); // Filter by status
  } else {
    if(active==="All"){
      filterTodo(`priority=${filter}`)
      return
    }
    filterTodo(`priority=${filter}`, `status=${active}`); // Filter by both priority and status
  }}
    return searchTool

}