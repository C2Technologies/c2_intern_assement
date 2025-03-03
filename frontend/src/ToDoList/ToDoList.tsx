import "./styles/Mainstyle.css";
import "./styles/CreateTask.css";
import "./styles/SortTask.css";
import "./styles/TaskList.css";
import "./styles/Description.css";
import Save from "./styles/icons/save";
import DeleteIcon from "./styles/icons/deleteIcon";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface timeInterface{
    dayName: string;
    monthName: string;
    day: number;
    year: number;
    hours: string;
    minutes: string;
    seconds: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    date: Date;
    dateString: string;
}

export default function ToDoList(){
    /* Task section */
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ title: "", description: "" });
    const [editTask, setEditTask] = useState<boolean>(false);
    const [focusTask, setFocusTask] = useState<Task | null>(null);

    
    async function getAllTaskApi(){
        const URL: string = "http://localhost:8000/tasks";
        try{
            const response = await axios.get(URL);
            setTasks(response.data);
            return response.data
        }
        catch(error){
            console.error('GET Error:', error);
        }
    }

    async function createTaskApi(task: Task){
        const URL: string = "http://localhost:8000/tasks";

        let bodyRequest = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            date: task.date,
            dateString: task.dateString,
        }; 

        try{
           await axios.post(URL, bodyRequest);
        }
        catch(error){
            console.error('POST Error:', error);
        }
    }

    async function deleteTaskApi(taskId: number){
        const URL: string = `http://localhost:8000/tasks/${taskId}`;
        
        try{
            await axios.delete(URL);
        }
        catch(error){
            console.error('DELETE Error:', error);
        }
    }

    async function updateTaskApi(task: Task){
        const URL: string = `http://localhost:8000/tasks/${task.id}`;

        let bodyRequest = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            date: task.date,
            dateString: task.dateString,
        }; 

        try{
            await axios.put(URL, bodyRequest);
        }
        catch(error){
            console.error('PUT Error:', error);
        }
    }


    async function createTask() {
        if (newTask.title.trim() === "") return;

        const date:timeInterface = timeStructure()
        const formattedDate = `${date.dayName} ${date.monthName} ${date.day} ${date.year} ${date.hours}:${date.minutes}`;

        let task: Task = {
            id: new Date().getTime(),
            title: newTask.title,
            description: newTask.description,
            completed: false,
            date: new Date(),
            dateString: formattedDate,
        }; 

        await createTaskApi(task);
        const response:Task[] = await getAllTaskApi();
        
        let id:number = new Date().getTime();
        try{
            id = response[response.length - 1].id;
        }
        catch{
            id = new Date().getTime();
        }
        
    
        task = {
            id: id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            date: task.date,
            dateString: task.dateString,
        }; 
        
        setTasks([...tasks, task]);
        setNewTask({ title: "", description: "" });
    }

    async function saveEdit(task: Task) {
        if (editingTaskId !== null) {
            setTasks(
                tasks.map((task) => task.id === editingTaskId
                    ? { ...task, title: editForm.title, description: editForm.description }
                    : task
                )
            );
        
            setEditingTaskId(null);
            setEditForm({ title: "", description: "" });
        }
        setShowDescription(false);
        setEditDescription(false);
        setEditTask(false);
        setFocusTask(null);

        await updateTaskApi(task);
    }

    async function edit(task: Task) {
        setEditingTaskId(task.id);
        setEditForm({ title: task.title, description: task.description });
        await updateTaskApi(task);
    }

    function deleteTask(id: number) {
        deleteTaskApi(id);
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const toggleTaskCompletion = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditForm({ title: "", description: "" });
    };
    
    /* Time section */
    function timeStructure():timeInterface{
        const date: Date = new Date();
        const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            dayName: days[date.getDay()],
            monthName: months[date.getMonth()],
            day: date.getDate(),
            year: date.getFullYear(),
            hours: date.getHours().toString().padStart(2, '0'),
            minutes: date.getMinutes().toString().padStart(2, '0'),
            seconds: date.getSeconds().toString().padStart(2, '0'),
        };
    }

    const [currentTime, setCurrentTime] = useState<timeInterface>(timeStructure());

    /* Filter section */
    const [filter, setFilter] = useState<"All" | "Complete" | "Pending">("All");
    function filteredTasks() {
        return tasks.filter((task) => {
            if (filter === "Complete") return task.completed;
            if (filter === "Pending") return !task.completed;
            return true;
        });
    }

    /* Description section */
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [editDescriptionId, setEditDescriptionId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [editForm.description]);

    function showDescriptionId(task: Task) {
        setEditDescriptionId(task.id);
        setShowDescription(!showDescription);
        setEditDescription(true);
        setFocusTask(null);
    }

    /* Use effect section */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(timeStructure());
        }, 1000);

        
        const fetchData = async () => {
            try {
                await axios.get("http://localhost:8000/");
            } 
            catch (err) {
                console.log("Failed to fetch data");
            } 
        };
        fetchData();

        getAllTaskApi();

        return () => clearInterval(interval);

    }, []);

    return (
        <div id="main-section">
            <div id="section-container">
                {/* header section */}
                <div id="top-task-container">
                    <div className="top-task-item-container">
                        <div id="current-date">
                            <span id="current-time-1">{`${currentTime.hours}:${currentTime.minutes}:${currentTime.seconds}`}</span>
                            <span id="current-time-2">{`${currentTime.dayName}, ${currentTime.day} ${currentTime.monthName}`}</span>
                        </div>
                    </div>
                    <div className="top-task-item-container" id="top-tic-middle">
                        <div className="vertical-divider"></div>
                    </div>
                    <div className="top-task-item-container" id="top-tic-right">
                        <p className="create-task-icon">Create a list of task</p>
                    </div>
                </div>

                {/* Create a task section */}
                <div id="create-task-container">
                    <div id="new-task">
                        <input
                            id="task-input"
                            type="text"
                            placeholder="Add a new task"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <div id="add-button-containner">
                            <button id='add-button' onClick={createTask}>
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="4" x2="4" y2="8" stroke="black" />
                                    <path d="M0 4H8" stroke="black" />
                                </svg>
                                <span>New Task</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="horizontal-divider" id="divider-1"></div>

                {/* Filter section */}
                <div id="sort-task-container">
                    <div id="sort-container">
                        {["All", "Complete", "Pending"].map((filterType) => (
                        <div key={filterType} className="filter-button-contaier">
                            <span
                            className={`filter-button ${filter === filterType ? "clicked" : ""}`}
                            onClick={() => setFilter(filterType as "All" | "Complete" | "Pending")}
                            >
                            {filterType}
                            </span>

                            <div className="filter-count-container">
                                {filter === filterType && <div className="count-task">{filteredTasks().length}</div>}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* List of task section */}
                <div id="list-task-container">
                    {showDescription && (
                        <div id="description-container">
                            <div id="description-top-container">
                                <div className="description-top-item">
                                    <p>{focusTask?.title}</p>
                                    <div onClick={() => { if(focusTask){saveEdit(focusTask)}}} className="task-icon-container" id="save-descritpion"><Save/></div>
                                </div>
                                <div className="description-top-item-1" id="edit-description-input-container">
                                    {editDescription && editingTaskId === focusTask?.id
                                        ? (
                                            <div id="edit-container">
                                                <textarea
                                                    ref={textareaRef}
                                                    id="edit-description"
                                                    autoFocus
                                                    value={editForm.description}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setEditForm({ ...editForm, description: e.target.value })
                                                    }}
                                                />
                                            </div>
                                        )
                                        : (
                                            <div id="description-value" onClick={() => { if(focusTask){edit(focusTask);} }}>
                                                {focusTask?.description === "" ? "Write a description for task..." : focusTask?.description}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div id="description-bottom-container">
                                <span onClick={()=>{
                                    if(focusTask){
                                        edit(focusTask);
                                        setEditForm({ ...editForm, title: focusTask?.title,  description: "" });
                                    }
                                    
                                }} id="clear-container">Clear</span>
                            </div>
                        </div>
                    )}

                    <ul className="filler" id="task-list">
                        {filteredTasks().map((task) => (
                            <li className="filler" id="list-container" key={task.id}>


                                {showDescription && editDescriptionId === task.id && (
                                    <div id="description-main-container">
                                        <div id="description">
                                            <div id="description-top-container">
                                                <div className="description-top-item">
                                                    <div>{task.title}</div>
                                                    <div onClick={() => { saveEdit(task)}} className="task-icon-container" id="save-descritpion"><Save /></div>
                                                </div>
                                                <div className="description-top-item" id="edit-description-input-container">
                                                    {editDescription && editingTaskId === task.id
                                                        ? (
                                                            <div id="edit-container">
                                                                <textarea
                                                                    ref={textareaRef}
                                                                    id="edit-description"
                                                                    autoFocus
                                                                    value={editForm.description}
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setEditForm({ ...editForm, description: e.target.value })
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                        : (
                                                            <div id="description-value" onClick={() => { edit(task); }}>
                                                                {task.description === "" ? "Write a description for task..." : task.description}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div id="description-bottom-container">
                                                <span>Clear</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
    
                                <div id="task-container">
                                    <div id="task">
                                        <div id="task-top-container">
                                            <div id="task-top-inner-container">
                                                <div className="task-top-item" id="task-ti-left">
                                                    <div id="task-title-container">
                                                        {editTask && editingTaskId === task.id
                                                            ? (
                                                                <div id="edit-container">
                                                                    <div onClick={() => { saveEdit(task)}}>
                                                                        <Save />
                                                                    </div>
                                                                    <input
                                                                        id="edit-title"
                                                                        autoFocus
                                                                        autoSave=""
                                                                        type="text"
                                                                        value={editForm.title}
                                                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                                    />
                                                                </div>
                                                            )
                                                            : (
                                                                <span className={`task-title ${task.completed ? "completed" : ""}`} onClick={() => { edit(task); setEditTask(true); }}>
                                                                    {task.title}
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="task-top-item" id="task-ti-middle">
                                                    <span onClick={() => {showDescriptionId(task); setFocusTask(task)}} id="task-desciption-icon">
                                                        Description
                                                    </span>
                                                </div>
                                                <div className="task-top-item" id="task-ti-right">
                                                    <div className="task-icon-container">
                                                        <span onClick={() => { 
                                                            toggleTaskCompletion(task.id)
                                                            updateTaskApi(task);
                                                        }} className={`status-check ${task.completed ? "clicked" : ""}`}></span>
                                                        <span id="task-status">{task.completed ? "Completed" : "Pending"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="divider"></div>
                                        </div>
                                        <div id="task-bottom-container">
                                            <div className="task-bottom-item">
                                                <span id="task-date">{task.dateString}</span>
                                            </div>
                                            <div className="task-bottom-item" id="task-bi-right">
                                                <div className="task-icon-container">
                                                    <span onClick={() => deleteTask(task.id)} id="delete-task">
                                                        <DeleteIcon />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}