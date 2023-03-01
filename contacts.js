const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

require("colors");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find((item) => item.id === contactId);
    const newContactList = contacts.filter((item) => item.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    console.log(`Contact id "${contactId}" deleted successfully!`.green);
    return removedContact;
  } catch (err) {
    console.log(`contact with id #${contactId} is not in the database`.red);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContacts = { name, email, phone, id: v4() };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContacts;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
