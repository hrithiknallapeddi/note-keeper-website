document.querySelector('.new').addEventListener('click',()=>{

    document.querySelector('.createNote').style.display='block'
    document.querySelector('.folder').style.display='none'
    document.querySelector('.right2').style.display='none'
    document.querySelector('.noteTasks').style.display='none'
  
});
  
  let notesListRootElement = document.querySelector('.noteslist');
  
  
  let notes = []
  let alltasks = []
  
  
  function renderElementsToScreen(){
      if(localStorage.getItem('notes')){
          notes = JSON.parse(localStorage.getItem('notes'))
          notes.forEach(note =>{
              renderNoteToList(note, note.uniqueID,note.alltasks)
          })
      }
  
      
  }

  function renderTasksToScreen(){
    if(localStorage.getItem('alltasks')){
      alltasks=JSON.parse(localStorage.getItem('alltasks'))
      alltasks.forEach(task=>{
        renderTaskToList(task)
        
      })
    }
  }

  document.querySelector('#createNoteButton').addEventListener('click', () =>{
    let uniqueID  = 'note' + Math.floor(Math.random() * 1000)
    let note = {
        title : document.querySelector('#title').value,
        content : document.querySelector('#description').value,
        alltasks:[

        ]
        
    }
    if(note.title.length>0 && note.content.length>0){
      addNoteToLocalStorage(note, uniqueID)
      renderNoteToList(note, uniqueID)
      document.querySelector('.createNote').style.display='none';

    }
    else{
         alert('please enter note title & note description')
    }
  })

  document.querySelector('#add').addEventListener('click',()=>{
    
    document.querySelector('.createNote').style.display='none';
    document.querySelector('.noteTasks').style.display='block';
   document.querySelector('.new_task').style.display='block';


   
   
   })
document.querySelector('#taskbutton').addEventListener('click',()=>{
  document.querySelector('.new_task').style.display='none'
  renderTasksToScreen()
   })

   noteDeleteButton=document.querySelector('#delete')
   noteDeleteButton.addEventListener('click',()=>{
    
      removeElementFromNotesList(uniqueID)


   })


function renderNoteToList(note,uniqueID){


  let noteDiv = document.createElement('div')
  noteDiv.classList.add('note',uniqueID)
   let noteTitle = document.createElement('h4')
   let noteContent = document.createElement('p')
   let noteTasks=document.createElement('div')
   noteTasks.setAttribute('class','noteTasks')
   let h1=document.createElement('h1')
   h1.setAttribute('id','heading')
   h1.innerHTML='Tasks List'
    let tasklist=document.createElement('div')
    tasklist.setAttribute('id','tasklist')
    


   noteTitle.innerText = note.title
   noteContent.innerText = note.content

  
   noteDiv.appendChild(noteTitle)
   noteDiv.appendChild(noteContent)
   noteDiv.appendChild(noteTasks)
   noteTasks.appendChild(h1)
   noteTasks.appendChild(tasklist)
   notesListRootElement.appendChild(noteDiv)
   

  
   document.querySelector('#title').value='';
   document.querySelector('#description').value='';


   noteDiv.addEventListener('click',()=>{
      
    let h1=document.querySelector('#h1')
    h1.innerText=note.title;
    let p=document.querySelector('#p')
    p.innerText=note.content;
   
    document.querySelector('.createNote').style.display='none';
    document.querySelector('.folder').style.display='none';
    document.querySelector('.right2').style.display='block';
    document.querySelector('.noteTasks').style.display='block'
   
   })

   document.querySelector('#taskbutton').addEventListener('click',()=>{
    
    let task={
      name:document.querySelector('#input').value,
      completed:false,
      uniqueID:generateTaskUniqueID()
    }
   
      note.alltasks.push(task)
      localStorage.setItem('notes',JSON.stringify(notes))
      renderTaskToList(task)
     addTaskToLocalStorage(task)
    
  })    
   

  
}







function generateTaskUniqueID() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10);
    return `task-${timestamp}-${randomNumber}`
}

tasklist=document.querySelector('#tasklist')
alltasks=[]


function renderTaskToList(task){
  tasklist=document.querySelector('#tasklist')
  let taskdiv=document.createElement('div')
  taskdiv.classList.add('task')
  let taskcheckbox=document.createElement('input')
  taskcheckbox.setAttribute('type','checkbox')
  taskcheckbox.setAttribute('name','checkbox')
  taskcheckbox.checked=task.completed
  let taskname=document.createElement('p')
 taskname.setAttribute('class','hello')
  taskname.innerHTML=task.name

  taskdiv.appendChild(taskcheckbox)
  taskdiv.appendChild(taskname)
  tasklist.appendChild(taskdiv)

  document.querySelector('#input').value=''
  taskcheckbox.addEventListener('change',()=>{
    alert('is it true')
    task.completed=!task.checked;
    //localStorage.setItem('notes',JSON.stringify(notes))

    
  });
}



document.querySelector('#cls').addEventListener('click',()=>{
    document.querySelector('.new_task').style.display='none';
  })
 
  document.querySelector('#close').addEventListener('click',()=>{
    document.querySelector('.createNote').style.display='none';
  })
 

function addNoteToLocalStorage(note, uniqueID){
    note = {...note, uniqueID}

    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))
}

function addTaskToLocalStorage(task){
  task={...task}
  alltasks.push(task);
  localStorage.setItem('alltasks',JSON.stringify(alltasks))
}
function removeElementFromNotesList(id){
    console.log(id)
    document.querySelector('.'+id).remove();
    notes = JSON.parse(localStorage.getItem('notes'))

    let index = notes.findIndex(note=> note.uniqueID == id)
    
    notes.splice(index, 1)

    localStorage.setItem('notes', JSON.stringify(notes));
}

renderElementsToScreen()


let notesFounded = document.querySelector('.notesFounded')

if(notes.length==0){
   notesFounded.innerHTML='NO '
}
else{
  notesFounded.innerHTML=notes.length
}

document.querySelector('#delete').addEventListener('click',()=>{
  removeElementFromNotesList(id)
})

