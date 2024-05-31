package webprogramming.week5.websocket.messages.dto;

import lombok.Builder;

@Builder
public record MessagesReadResponse(String sender, String message, Long roomId) {
}
