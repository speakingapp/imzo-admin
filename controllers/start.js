const {bot} = require('../bot')
const {keyboard} = require('./buttons')
const { getFirestore, doc, setDoc, collection, getDocs } = require("firebase/firestore");
const {db} = require('./users')



bot.start((ctx)=>{
   
    ctx.replyWithChatAction('typing')
    setTimeout(async ()=>{
        ctx.replyWithHTML(`Здравствуйте, <b>${ctx.message.chat.first_name}</b>! Я Администратор отдела продаж Imzo Navoiy. Меня зовуть Азиза`, {
            reply_markup: keyboard,
          });
      
      await setDoc(doc(db, "users", `${ctx.message.chat.id}`), {
  name: `${ctx.message.chat.first_name}`,
  username: `${ctx.message.chat.username}`,
  user_id: `${ctx.message.chat.id}`,

});
    },200)   
})








/* 
bot.command('/statistics', async (ctx)=>{
    const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  const user =doc.data();
  ctx.replyWithHTML(`
    Foydalanuvchilar:
    <b>Id: ${user.user_id}</b> 
    <b>Ismi: ${user.name}</b>
    <b>Username: @${user.username}</b>
    `)
});
})


*/

