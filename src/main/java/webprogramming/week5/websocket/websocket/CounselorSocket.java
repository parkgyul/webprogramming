package webprogramming.week5.websocket.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import webprogramming.week5.websocket.config.ServerEndpointConfigurator;
import webprogramming.week5.websocket.messages.dto.MessageSaveRequest;
import webprogramming.week5.websocket.messages.service.MessagesService;
import webprogramming.week5.websocket.room.repository.RoomService;


import java.io.IOException;
import java.util.List;
import java.util.Map;

@ServerEndpoint(value = "/socket/counselor", configurator = ServerEndpointConfigurator.class)
@Slf4j
@RequiredArgsConstructor
public class CounselorSocket {
    private static Session counselor = null;
    private final MessagesService messagesService;
    private final RoomService roomService;
    private Long roomId;

    @OnOpen
    public void websocketOpen(Session session) throws IOException {
        counselor = session;
        // roomId를 설정하는 로직 추가 필요
        // 예를 들어, 쿼리 파라미터로 roomId를 전달받는 경우
        // roomId = Long.parseLong(session.getRequestParameterMap().get("roomId").get(0));
        Map<String, List<String>> queryParams = session.getRequestParameterMap();
        if (queryParams.containsKey("roomId")) {
            try {
                roomId = Long.parseLong(queryParams.get("roomId").get(0));
                roomService.addCounselorSession(roomId, session);
                log.info("Counselor connected to room ID: {}", roomId);
            } catch (NumberFormatException e) {
                log.error("Invalid roomId format: {}", queryParams.get("roomId").get(0));
                session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "Invalid roomId format"));
            }
        } else {
            log.error("roomId query parameter is missing");
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "Missing roomId query parameter"));
        }
        roomService.addCounselorSession(roomId, session);
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException {
        log.info("counselor onMessage {}", message, session.getId());

        try {
            Map<String, Object> messageMap = new ObjectMapper().readValue(message, Map.class);
            Long roomId = ((Integer) messageMap.get("chatRoomId")).longValue();
            String from = (String) messageMap.get("from");
            String mes = (String) messageMap.get("message");

            MessageSaveRequest messageSaveRequest = MessageSaveRequest.builder()
                    .from(from)
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
        roomService.removeCounselorSession(roomId);
        counselor = null;
        log.info("counselor session close : {}", session.getId());
    }
}
