package webprogramming.week5.websocket.room.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import webprogramming.week5.websocket.client.dto.ClientSaveRequest;
import webprogramming.week5.websocket.room.dto.RoomListResponse;
import webprogramming.week5.websocket.room.repository.RoomService;
import webprogramming.week5.websocket.util.ApiUtil;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    @GetMapping("/list")
    public ResponseEntity<ApiUtil.ApiSuccessResult<List<RoomListResponse>>> getAllroom(
    ){
        List<RoomListResponse> responseList = roomService.getAllroom();
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.CREATED,responseList));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiUtil.ApiSuccessResult<Long>> getTodayRoomNumber(
    ){
        Long today =  roomService.todayRoomNumber();
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.CREATED, today));
    }

    @GetMapping("/total")
    public ResponseEntity<ApiUtil.ApiSuccessResult<Long>> getTotalRoomNumber(
    ){
        Long total = roomService.totalRoomNumber();
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.CREATED,total));
    }
}
