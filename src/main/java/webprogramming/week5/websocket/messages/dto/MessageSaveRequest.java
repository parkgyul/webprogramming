package webprogramming.week5.websocket.messages.dto;

import lombok.Builder;

@Builder
public record MessageSaveRequest(Long room_id,String sender, String message) {
}
