const Conversation = require('../models/conversation')
const chatUpdates = require('./updates/chat')

const directChatHistoryHandler = async (socket, data) => {
    try {
        const { userId } = socket.user
        const { receiverUserId } = data
        // console.log(userId, receiverUserId)
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverUserId] },
            // type: 'DIRECT',
        })
        // }).populate({
        //     path: 'messages',
        //     select: '_id',
        // })

        // console.log(conversation)
        if (conversation) {
            chatUpdates.updateChatHistory(
                conversation._id.toString(),
                socket.id
            )
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = directChatHistoryHandler
