package webprogramming.week5.websocket.room.dto;

import lombok.Builder;

@Builder

public record RoomListResponse(Long roomId, String clientName){ }
