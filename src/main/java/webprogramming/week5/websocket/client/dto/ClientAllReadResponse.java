package webprogramming.week5.websocket.client.dto;

import lombok.Builder;

@Builder
public record ClientAllReadResponse(Long client_id, String client_name) {
}
