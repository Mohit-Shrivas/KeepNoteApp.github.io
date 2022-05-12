const addbtn = document.querySelector('#add');

const updatelocalData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach( (note) => {
        return notes.push(note.value)
    })
    console.log(notes);
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addnote = (text = '') => {


    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="opration">
            <button class="edit"><i class="far fa-edit"></i> </button>
            <button class="delete"><i class="fas fa-trash-alt"></i> </button>
           
            <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class="${text ? "hidden" : "" }"></textarea> 
        </div>
    `;

    note.insertAdjacentHTML('afterbegin',htmlData );
    // console.log(note);


    const editbtn = note.querySelector('.edit');
    const delbtn = note.querySelector('.delete');
    const maindiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');


    delbtn.addEventListener('click',() => {
        note.remove();
        updatelocalData();
    });

    textarea.value = text;
    maindiv.innerHTML =text;

    editbtn.addEventListener('click', () => {
        maindiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        maindiv.innerHTML=value;

        updatelocalData();

    })

    document.body.appendChild(note);

}

const notdata = JSON.parse(localStorage.getItem('notes'));

if(notdata){ notdata.forEach( (note) => addnote(note)) };


addbtn.addEventListener('click', () => addnote() )