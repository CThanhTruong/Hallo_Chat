import React from 'react';
import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { Icon } from 'semantic-ui-react';
import { joinUsernames, notMe } from 'helpers';
/*
  Tạo danh sách phòng chat gồm các thành phần
  danh sách phòng chat myChats
  cấu hình của phần mềm khi user X đang login chatConfig
 */
export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();

  return (
    <div className="chat-list">
      {myChats.map((c, index) => (
        <div
          className={`chat-list-item ${
            selectedChat?.id === c.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        >
          <div
            onClick={() => selectChatClick(c)}
            className="chat-list-item-content"
          >
            {c.people.length === 1 ? (
              <>
                <Icon circular inverted color="blue" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">Phòng trống</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <ChatAvatar username={notMe(chatConfig, c)} chat={c} />

                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatConfig, c)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} đã gửi file`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUsernames(c.people, chatConfig.userName).slice(0, 50)}
                    ...
                  </div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} đã gửi file`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            )}
          </div>
          <div onClick={() => deleteChatClick(c)} className="chat-item-delete">
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
