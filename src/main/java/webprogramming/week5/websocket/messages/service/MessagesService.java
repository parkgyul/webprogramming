package webprogramming.week5.websocket.messages.service;

import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webprogramming.week5.websocket.messages.dto.MessageSaveRequest;
import webprogramming.week5.websocket.messages.dto.MessagesReadResponse;
import webprogramming.week5.websocket.messages.entity.Messages;
import webprogramming.week5.websocket.messages.repository.MessagesRepository;
import webprogramming.week5.websocket.room.repository.RoomRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessagesService {

    private final MessagesRepository messagesRepository;

    private final RoomRepository roomRepository;

    public Long saveMessage(MessageSaveRequest messageSaveRequest){

        Messages messages =Messages.builder()
                .sender(messageSaveRequest.sender())
                .message(messageSaveRequest.message())
                .room(roomRepository.getById(messageSaveRequest.room_id()))
                .build();

        messagesRepository.save(messages);

        return messages.getId();
    }

    public List<MessagesReadResponse> getAllMessages(Long roomId){
        try{
            List<Messages> messagesList = messagesRepository.findByRoomId(roomId);
            List<MessagesReadResponse> responseList = new ArrayList<>();

            for(Messages messages: messagesList){
                responseList.add(
                        new MessagesReadResponse(messages.getSender(), messages.getMessage(), messages.getRoom().getId())
                );
            }
            return responseList;
        }catch (Exception e){
        }
        return null;
    }


}
