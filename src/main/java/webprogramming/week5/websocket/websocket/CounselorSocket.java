package webprogramming.week5.websocket.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import webprogramming.week5.websocket.config.ServerEndpointConfigurator;
import webprogramming.week5.websocket.messages.dto.MessageSaveRequest;
import webprogramming.week5.websocket.messages.service.MessagesService;
import webprogramming.week5.websocket.room.repository.RoomService;


import java.io.IOException;
import java.util.List;
import java.util.Map;



@Service
@ServerEndpoint(value = "/socket/counselor", configurator = ServerEndpointConfigurator.class)
@Slf4j
@RequiredArgsConstructor
public class CounselorSocket {
    private static Session counselor = null;
    private final MessagesService messagesService;
    private final RoomService roomService;
    private static long RoomNumber = 0;
    public void setRoomNumber(long roomId) {
        RoomNumber = roomId;
        log.info("setRoomNumber 바뀜 {}", RoomNumber);
    }
    public static Session getCounselor() {return counselor;}
    private static volatile boolean counselorReady = false; // 상담원 준비 상태를 나타내는 플래그

    public static boolean isCounselorReady() {
        return counselorReady;
    }
    @OnOpen
    public void websocketOpen(Session session) throws IOException {
        if (session == null) {
            log.error("Session is null in websocketOpen");
            return;
        }
        counselor = session;

        counselorReady = true; // 상담원이 접속됨을 표시
        log.info("Counselor session opened: {}", session.getId());
        log.info("Counselor session opened: {}", counselor.getId());
        roomService.addCounselorSession(RoomNumber, session);
    }


    @OnMessage
    public void handleMessage(String message, Session session) throws IOException {
        log.info("counselor onMessage {}", message, session.getId());

        try {
            Map<String, Object> messageMap = new ObjectMapper().readValue(message, Map.class);
            Object roomIdObject = messageMap.get("roomId");
            Long roomId = (roomIdObject instanceof Integer) ? ((Integer) roomIdObject).longValue() : Long.parseLong((String) roomIdObject);
            String sender = (String) messageMap.get("sender");
            String mes = (String) messageMap.get("mes");

            MessageSaveRequest messageSaveRequest = MessageSaveRequest.builder()
                    .sender(sender)
                    .message(mes)
                    .room_id(roomId).build();
            messagesService.saveMessage(messageSaveRequest);

            Session clientSession = roomService.getClientSession(roomId);
            if (clientSession != null) {
                clientSession.getBasicRemote().sendText(message);
            }
        } catch (IOException e) {
            log.error("Error in onMessage: {}", e.getMessage());
        }
    }

    @OnClose
    public void handleClose(Session session) {
        counselorReady = false; // 상담원이 접속을 종료함을 표시
        counselor = null;
        log.info("Counselor session closed: {}", session.getId());
    }


}
