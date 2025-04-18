const db=require("./pool");

// async function getUser(id){
//     const {rows}=await db.query("SELECT * FROM users WHERE id=$1;",[id]);
//     return rows[0];
// }

async function getUser(id) {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
  }

async function getUserByUserName(username) {
    const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}
async function isValidUser(username) {
    const {rows}=await db.query("SELECT * FROM users WHERE username=$1;",[username]);
    return rows.length===0;
}
async function addUser(firstName,lastName,username,password,membership) {
    await db.query("INSERT INTO users (firstName,lastName,username,password,membership) values($1,$2,$3,$4,$5);",[firstName,lastName,username,password,membership])
}
async function deleteUser(id) {
    await db.query("DELETE FROM users WHERE id=$1;",[id]);
}
async function updateUser(firstName,lastName,password,id,membership) {
    await db.query("UPDATE users SET firstName=$1, lastName=$2,password=$3 ,membership=$5 WHERE id=$4 ;",[firstName,lastName,password,id,membership]);
}
async function getUsers() {
    const {rows}=await db.query("SELECT * FROM users;");
    return rows;
}
async function getMessage(id) {
    const {rows}=await db.query("SELECT * FROM messages WHERE id=$1",[id]);
    return rows[0];
}
async function getUserMessages(username) {
    const {rows}=await db.query("SELECT * FROM messages WHERE username=$1;"[username])
    return rows;
}
async function addMessage(title,content,username) {
    await db.query("INSERT INTO messages (title,content,username) values ($1,$2,$3);",[title,content,username])
}
async function deleteMessage(id) {
    await db.query("DELETE FROM messages WHERE id=$1;",[id])
}
async function updateMessage(title,content,username) {
    await db.query("UPDATE messages SET title=$1, content=$2 WHERE username =$3;",[title,content,username])
}

async function getAllMessages() {
    const {rows}=await db.query("SELECT * FROM messages;")
    return rows;
}

getUserByUserName("AW")
module.exports={
    getUserByUserName,
    isValidUser,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getUsers,
    getUserMessages,
    getAllMessages,
    addMessage,
    updateMessage,
    deleteMessage,
    getMessage
}

