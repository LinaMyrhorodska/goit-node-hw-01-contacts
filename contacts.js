const fs = require("fs/promises");
const path = require("node:path");
const { parse } = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findContactDel = contacts.findIndex(({id}) => id === contactId);
  const removedContact = contacts.splice(findContactDel, 1);
  const contactStrf = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactStrf);
  return removedContact; 
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const id = contacts[contacts.length - 1].id + 1;
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};