const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=";
let pendingInvitations = 0;
let contacts = [];

function loadContacts() {
  fetch(url + 8)
    .then((response) => response.json())
    .then((data) => {
      contacts = data;
      render();
    });
}

function render() {
  const contactList = document.querySelector(".contact-list");
  contactList.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const person = contacts[i];
    const li = document.createElement("li");
    const fullName = person.name.first + " " + person.name.last;

    const profile = `
        <p style="background-image: url('https://picsum.photos/200');" class="back">
        <img src = ${person.picture} class="img">
        <button class="delBtn">X</button>
        <h2>${fullName}</h2>
        <p>${person.title}</p>
        <p class="mutual-connections">${person.mutualConnections} mutual connections</p>
        <button class="connectBtn">Connect</button>`;

    const newPerson = document.createElement("div");
    newPerson.classList.add("person");
    newPerson.innerHTML = profile;
    contactList.appendChild(newPerson);
  }

  /***** Connect Button ******/
  const connectBtn = document.querySelectorAll(".connectBtn");
  let pendingNum = document.querySelector("#pending-invitations");
  connectBtn.forEach((el) => {
    el.addEventListener("click", function () {
      if (el.innerText === "Connect") {
        el.innerText = "Pending";
        pendingInvitations += 1;
        pendingNum.innerText = pendingInvitations;
      } else {
        el.innerText = "Connect";
        pendingInvitations -= 1;
        pendingNum.innerText = pendingInvitations;
      }
    });
  });

  /***** Delete Button ******/
  const delBtn = document.querySelectorAll(".delBtn");
  delBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      //loadOnePerson();
    });
  });
}

function loadOnePerson() {
  fetch(url + "1")
    .then((response) => response.json())
    .then((personFromApi) => {
      //contacts.push(personFromApi[0]);
      render(personFromApi[0]);
    });
}

loadContacts();
