import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit, FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const activeTodos = todos.filter(item => !item.isCompleted)
  const completedTodos = todos.filter(item => item.isCompleted)

  const TaskCard = ({ item }) => (
    <div className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]">
      <div className="flex min-w-0 items-start gap-3">
        <input
          name={item.id}
          onChange={handleCheckbox}
          type="checkbox"
          checked={item.isCompleted}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm accent-amber-400"
        />
        <span className={"text-sm leading-snug text-white/80 " + (item.isCompleted ? "text-white/30 line-through" : "")}>
          {item.todo}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
        <button
          onClick={(e) => handleEdit(e, item.id)}
          className="rounded-md p-1.5 text-white/30 transition hover:bg-white/10 hover:text-amber-400"
        >
          <FaEdit className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { handleDelete(e, item.id) }}
          className="rounded-md p-1.5 text-white/30 transition hover:bg-white/10 hover:text-red-400"
        >
          <AiFillDelete className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className="min-h-screen bg-[#0b0a08]">
        <Navbar />
        <div className="grid grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[280px_1fr] lg:gap-14 lg:px-12 lg:py-14">

          <aside className="lg:sticky lg:top-10 lg:self-start">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Your tasks
            </h1>
            <p className="mt-2 text-sm text-white/40">
              Everything you need to get done, in one clean list.
            </p>

            {todos.length > 0 && (
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tabular-nums text-amber-400">
                  {completedTodos.length}
                </span>
                <span className="text-sm text-white/40">
                  of {todos.length} completed
                </span>
              </div>
            )}

            <div className="addTodo mt-8">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
                Add a task
              </h2>
              <div className="flex flex-col gap-2">
                <input
                  onChange={handleChange}
                  value={todo}
                  type="text"
                  placeholder="e.g. Finish the quarterly report"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/40"
                />
                <button
                  onClick={handleAdd}
                  disabled={todo.length <= 3}
                  className="cursor-pointer flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/25"
                >
                  <FaPlus className="h-3 w-3" />
                  Add task
                </button>
              </div>
            </div>
            <label htmlFor="show" className="mt-8 flex cursor-pointer select-none items-center justify-between border-t border-white/10 pt-6">
              <span className="text-sm text-white/60">Show completed</span>
              <span className="relative inline-block h-5 w-9">
                <input
                  id="show"
                  onChange={toggleFinished}
                  type="checkbox"
                  checked={showFinished}
                  className="peer sr-only"
                />
                <span className="absolute inset-0 rounded-full bg-white/10 transition peer-checked:bg-amber-400"></span>
                <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4"></span>
              </span>
            </label>
          </aside>

          <main className="min-w-0">
            {todos.length === 0 && (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center">
                <p className="text-sm font-medium text-white/50">Nothing here yet</p>
                <p className="mt-0.5 text-xs text-white/30">Add your first task to get started.</p>
              </div>
            )}

            <div className={"grid grid-cols-1 gap-10 " + (showFinished && completedTodos.length > 0 ? "xl:grid-cols-2" : "")}>

              {activeTodos.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Active</h2>
                    <span className="text-xs text-white/30">{activeTodos.length}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
                    {activeTodos.map(item => <TaskCard key={item.id} item={item} />)}
                  </div>
                </section>
              )}

              {showFinished && completedTodos.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Completed</h2>
                    <span className="text-xs text-white/30">{completedTodos.length}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
                    {completedTodos.map(item => <TaskCard key={item.id} item={item} />)}
                  </div>
                </section>
              )}

            </div>
          </main>

        </div>
      </div>
    </>
  )
}
export default App