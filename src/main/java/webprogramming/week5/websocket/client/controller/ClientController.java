package webprogramming.week5.websocket.client.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import webprogramming.week5.websocket.client.dto.ClientSaveRequest;
import webprogramming.week5.websocket.client.service.ClientService;
import webprogramming.week5.websocket.util.ApiUtil;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;


    @PostMapping("/save")
    public ResponseEntity<ApiUtil.ApiSuccessResult<Long>> saveClient(
            @RequestBody()ClientSaveRequest clientSaveRequest
            ){
        Long saveId = clientService.clientSave(clientSaveRequest);
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.CREATED,saveId));
    }



}
