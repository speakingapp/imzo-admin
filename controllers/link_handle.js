const {bot} = require('../bot')

bot.use(async (ctx, next) => {
    const message = ctx.message;
    if (message) {
      const text = message.text || message.caption || '';
      const user = message.from;
  
      // Check if the user is an admin or the owner of the chat
      const chatMember = await ctx.getChatMember(user.id);
  
      if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
        // If the user is an admin or the owner, don't delete the message
        return next();
      }
  
      // Check for links
      if (text.match(/https?:\/\/\S+/)) {
        try {
          // Delete the message
          await ctx.deleteMessage(message.message_id);
  
          // Warn the user
          await ctx.reply(`⚠️ @${user.username}, guruhda havola ulashmang!`);
        } catch (error) {
          console.error('Error deleting message:', error);
        }
        return;
      }
  
      // Check for mentions
      if (text.includes('@') && !message.entities) {
        try {
          // Delete the message
          await ctx.deleteMessage(message.message_id);
  
          // Warn the user
          await ctx.reply(`@${user.username}, guruhda havola ulashmang!`);
        } catch (error) {
          console.error('Error deleting message:', error);
        }
        return;
      }
    }
  
    // Continue to the next middleware
    next();
  });
  