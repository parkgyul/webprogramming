package webprogramming.week5.websocket.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
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
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@ServerEndpoint(value = "/socket/client", configurator = ServerEndpointConfigurator.class)
@RequiredArgsConstructor
public class ClientSocket {
    private static Session client;
    private final MessagesService messagesService;
    private final RoomService roomService;
    private final CounselorSocket counselorSocket;
    private static long RoomNumber = 0;
    private Client c;
    private Room room;
    private Session counselor;

    @OnOpen
    public void websocketOpen(Session session) throws IOException {
        log.info("counselor in clientSocket {}", counselor);
        client = session;
        RoomNumber++;
        room = roomService.getRoomByNumber((int) RoomNumber);

        c = room.getClient();
        roomService.addClientSession(RoomNumber, session);


        this.counselor = CounselorSocket.getCounselor();
        log.info("counselor in clientSocket {}", counselor);
        if (CounselorSocket.isCounselorReady()) {
            sendChatRoomIdToCounselor();
        } else {
            log.warn("Counselor session is not ready. Waiting for counselor to connect...");
            new Thread(() -> {
                try {
                    int attempts = 0;
                    while (!CounselorSocket.isCounselorReady() && attempts < 10) {
                        Thread.sleep(1000); // 1초 대기
                        attempts++;
                        log.info("Retrying to send room ID to counselor. Attempt {}", attempts);
                    }
                    if (CounselorSocket.isCounselorReady()) {
                        sendChatRoomIdToCounselor();
                    } else {
                        log.error("Failed to send room ID to counselor after {} attempts", attempts);
                    }
                } catch (InterruptedException | IOException e) {
                    log.error("Error while waiting for counselor to connect: {}", e.getMessage());
                }
            }).start();
        }
    }



    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("Client onMessage {}", message);
        try {
            Map<String, Object> messageMap = new ObjectMapper().readValue(message, Map.class);

            String mes = (String) messageMap.get("mes");
            String roomIdString = (String) messageMap.get("roomId");
            Long roomId = Long.parseLong(roomIdString);
            String sender= (String) messageMap.get("sender");

            MessageSaveRequest messageSaveRequest = MessageSaveRequest.builder()
                    .sender(sender)
                    .message(mes)
                    .room_id(roomId)
                    .build();
            messagesService.saveMessage(messageSaveRequest);


            if (counselor != null) {
                log.info("보내고 있는데 왜 그러냐고 !!!!!!!,{}",counselor);
                counselor.getBasicRemote().sendText(message);
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

    private void sendChatRoomIdToCounselor() throws IOException {
        Map<String, Object> message = new HashMap<>();
        message.put("type", "roomId");
        message.put("roomId", RoomNumber);

        String jsonMessage = new ObjectMapper().writeValueAsString(message);
        log.info("Sending message to counselor: {}", jsonMessage);
        log.info(counselor.getId());
        log.info(String.valueOf(CounselorSocket.isCounselorReady()));
        if (counselor != null && counselor.isOpen()) {
            counselor.getBasicRemote().sendText(jsonMessage);
        } else {
            log.warn("Counselor session is not available or not open.");
        }
    }


}
