import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((el) => el.id === contactId);
  return contactById || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex((el) => el.id === contactId);
  if (removeIndex > -1) {
    const removedContact = contacts.splice(removeIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } else {
    return null;
  }
};

export const addContact = async (contact) => {
  const contacts = await listContacts();
  const contactToAdd = { id: nanoid(), ...contact };
  contacts.push(contactToAdd);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToAdd;
};
