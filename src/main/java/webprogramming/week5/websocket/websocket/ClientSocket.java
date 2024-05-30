package webprogramming.week5.websocket.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import webprogramming.week5.websocket.client.entity.Client;
import webprogramming.week5.websocket.config.ServerEndpointConfigurator;
import webprogramming.week5.websocket.messages.dto.MessageSaveRequest;
import webprogramming.week5.websocket.messages.service.MessagesService;
import webprogramming.week5.websocket.room.entity.Room;
import webprogramming.week5.websocket.room.repository.RoomService;


import java.io.IOException;
import java.util.Map;

@Service
@Slf4j
@ServerEndpoint(value = "/socket/client", configurator = ServerEndpointConfigurator.class)
@RequiredArgsConstructor
public class ClientSocket {
    private static Session client;
    private final MessagesService messagesService;
    private final RoomService roomService;
    private static int RoomNumber = 0;
    private Client c;
    private Room room;

    @OnOpen
    public void websocketOpen(Session session) throws IOException {
        client = session;
        RoomNumber++;
        room = roomService.getRoomByNumber(RoomNumber);
        c = room.getClient();

        roomService.addClientSession(room.getId(), session);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("Client onMessage {}", message);
        try {
            Map<String, Object> messageMap = new ObjectMapper().readValue(message, Map.class);

            String mes = (String) messageMap.get("mes");
            Long roomId = (Long) messageMap.get("roomId");
            String from = c.getClient_name();

            MessageSaveRequest messageSaveRequest = MessageSaveRequest.builder()
                    .from(from)
                    .message(mes)
                    .room_id(roomId)
                    .build();
            messagesService.saveMessage(messageSaveRequest);

            Session counselorSession = roomService.getCounselorSession(roomId);
            if (counselorSession != null) {
                counselorSession.getBasicRemote().sendText(message);
            }
        } catch (IOException e) {
            log.error("Error in onMessage: {}", e.getMessage());
        }
    }
    @OnClose
    public void onClose(Session session) {
        client = null;
        log.info("clients session close : {}", session.getId());

        if (this.room != null) {
            log.info("Room ID: {}", this.room.getId());
        } else {
            log.warn("Room is null during onClose");
        }
    }
}
