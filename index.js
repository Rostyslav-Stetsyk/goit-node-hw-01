import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./db/contacts.js";

import { Command } from "commander";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);
    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);
    case "add":
      const addedContact = await addContact({ name, email, phone });
      return console.log(addedContact);
    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
