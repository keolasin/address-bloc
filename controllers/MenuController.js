const inquirer = require("inquirer");
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
            "View all contacts",
          "Exit"
        ]
      }
    ]

    // handles adding contact functionality
    this.book = new ContactController();
  }

  //handles the main menu
  main(){
    console.log(`Welcome to AddressBloc!`);
    inquirer.prompt(this.mainMenuQuestions).then((response) => {
      switch(response.mainMenuChoice){
        case "Add new contact":
          this.addContact();
          break;
        case "Exit":
          this.exit();
          break;
        case "View all contacts":
          this.getContacts();
          break;
        default:
          console.log("Invalid input");
          this.main();
      }
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  // clears console
  clear(){
    console.log("\x1Bc");
  }

  // uses ContactController module
  addContact(){
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
    });
  }

  getContacts(){
    this.clear();

    this.book.getContacts().then((contacts) => {
      for (let contact of contacts) {
        console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ============
        `);
      }
      this.main();
    }).catch((err) => {
      console.log(err);
      this.main();
    });
  }

  getContactCount(){
    return this.contacts.length;
  }

  exit(){
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }
}
