package webprogramming.week5.websocket.client.dto;

import lombok.Builder;

@Builder
public record ClientSaveRequest(String name) {
}
