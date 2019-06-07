const Contact = require("../db/models").Contact;


module.exports = class ContactController {
  constructor(){
    this.contacts = [];
    this.addContactQuestions = [
      {
        type: "input",
        name: "name",
        message: "Contact's name - ",
        validate(val){
          return val !== "";
        }
      },
      {
        type: "input",
        name: "phone",
        message: "Contact's phone number - ",
        validate(val){
          return val !== "";
        }
      },
      {
        type: "input",
        name: "email",
        message: "Contact's email - ",
        validate(val){
          return val !== "";
        }
      }
    ];
  }

  addContact(name,phone,email){
    return Contact.create({name, phone, email});
  }

  getContacts(){
    return Contact.findAll()
  }

  iterativeSearch(contacts, target){
    for(let contact of contacts){
      if(contact.name.toLowerCase() === target.toLowerCase()){
        return contact;
      }
    }
    return null;
  }

  binarySearch(contacts, target){
    let min = 0;
    let max = contacts.length - 1;
    let mid;

    while(min <= max){
      // find new mid and assign
      mid = Math.floor((min + max) / 2);
      let currentContact = contacts[mid];

      if(currentContact.name > target){ // target is in the lower half, set upper bound to old mid
        max = mid - 1;
      } else if(currentContact.name < target){ // target is in the upper half, set lower bound to old mid
        min = mid + 1;
      } else { // target found at mid, returned
        return contacts[mid];
      }
    }

    return null; // element not found
  }

  search(name){
    return Contact.findOne({
      where: {name}
    })
  }

}
