let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");
    let div_collection = document.getElementById('toy-collection');

    ////////////////////////////////////////////////////////

    fetch("http://localhost:3000/toys")
        .then(function (response) {
            return response.json()
        })

        .then(data => {
            console.log('data', data);
            for (let i = 0; i < data.length; i++) {

                const div = document.createElement('div');
                div.classList.add("card");

                div.innerHTML = `<h2>${data[i].name}</h2>
                    <img src=${data[i].image} class="toy-avatar" />
                    <p class="card-paragraph">${data[i].likes} </p>
                    <button class="like-btn">Like</button>
                   `
                div_collection.appendChild(div);

                //add button listener
                btn_listener = div.querySelector(".like-btn");
                btn_listener.addEventListener('click', () => {
                    //update the db.json
                    const toyID = data[i].id
                    // update_likes(id, value)
                    //update the node in the dom
                    let elem = div.querySelector(".card-paragraph")
                    let value = parseInt(elem.textContent) + 1
                    elem.innerHTML = `${value}`
                    update_likes(toyID, value)
                })



                ////////////////////////////////////////////////////////////////////
            }
        })
        .catch(error => console.log(error))
    // add new card
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyForm.style.display = "block";
        } else {
            toyForm.style.display = "none";
        }

        const add_toy = document.getElementById('add_toy');
        add_toy.addEventListener("click", () => {
            let name = document.getElementsByClassName('input-text');

            const dataToPost = {
                "name": name[0].value,
                "image": name[1].value,
                "likes": 0
            };
            //  console.log(dataToPost)
            fetch("http://localhost:3000/toys",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(dataToPost)

                })
                .then((response) =>
                    console.log(response.json())
                )
                .catch(error => console.log('error***', error))

        });
    });
});

function update_likes(toyID, value) {

    fetch(`http://localhost:3000/toys/${toyID}`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "likes": value })

        })
        .then((response) =>
            console.log(response.json())

        )
        .catch(error => console.log('error can not update', error))
}

/*
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let div_collection=document.getElementById('toy-collection');

////////////////////////////////////////////////////////

     fetch("http://localhost:3000/toys")
      .then(function (response) {
           return response.json()
     })

     .then(data => {
        console.log('data',data);
        for(let i=0;i<data.length;i++){

        const div= document.createElement('div');
        div.classList.add("card");

    div.innerHTML = `<h2>${data[i].name}</h2>
                    <img src=${data[i].image} class="toy-avatar" />
                    <p>${data[i].likes} </p>
                    <button class="like-btn">Like</button>
                   `
    div_collection.appendChild(div);

    //add button listener
btn_listener=div.children[3];
btn_listener.addEventListener('click',()=>{
  //update the db.json
  update_likes(i)
  //update the node in the dom
let elem= div.children[2]
let value=parseInt(elem.textContent)+1
elem.innerHTML=`${value}`
update_likes(i,value)
})



  ////////////////////////////////////////////////////////////////////
  }
     })
      .catch(error=> console.log(error))
// add new card
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }

    const add_toy=document.getElementById('add_toy');
    add_toy.addEventListener("click", () => {
    let name=document.getElementsByClassName('input-text');

    const dataToPost = {
          "name": name[0].value,
          "image": name[1].value,
          "likes":0
      };
    //  console.log(dataToPost)
      fetch("http://localhost:3000/toys",
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
           body: JSON.stringify(dataToPost)

        })
      .then((response)=>
      console.log(response.json())
    )
      .catch(error=> console.log('error***',error))

  });
});
});

function update_likes(i,value){

  fetch("http://localhost:3000/toys/:id",
    {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
       body: JSON.stringify({"likes":value})

    })
  .then((response)=>
  console.log(response.json())

)
  .catch(error=> console.log('error can not update',error))
}
*/
