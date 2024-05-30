package webprogramming.week5.websocket.messages.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import webprogramming.week5.websocket.messages.service.MessagesService;

@RestController
@RequestMapping("/messages")
public class MessagesController {

    MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }



}
