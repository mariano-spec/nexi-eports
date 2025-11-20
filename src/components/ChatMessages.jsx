import React from 'react'
import { Loader2 } from 'lucide-react'

const ChatMessages = ({ messages, isLoading }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-white text-gray-800 shadow-sm border border-gray-200'
            }`}
          >
            <p className="text-sm whitespace-pre-line break-words">{message.content}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <Loader2 className="animate-spin text-blue-600" size={20} />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatMessages
