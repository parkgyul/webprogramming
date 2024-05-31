package webprogramming.week5.websocket.messages.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import webprogramming.week5.websocket.messages.dto.MessagesReadResponse;
import webprogramming.week5.websocket.messages.service.MessagesService;
import webprogramming.week5.websocket.room.dto.RoomListResponse;
import webprogramming.week5.websocket.util.ApiUtil;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessagesController {

    MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }


    @GetMapping("/{roomId}")
    public ResponseEntity<ApiUtil.ApiSuccessResult<List<MessagesReadResponse>>> getAllroom(
            @PathVariable("roomId")Long roomId
    ){
        List<MessagesReadResponse> responseList = messagesService.getAllMessages(roomId);
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.CREATED,responseList));
    }



}
