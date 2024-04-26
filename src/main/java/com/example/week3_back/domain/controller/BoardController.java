package com.example.week3_back.domain.controller;
import com.example.week3_back.domain.request.dto.BoardUpdateRequestDto;
import com.example.week3_back.global.util.ApiUtil;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.week3_back.domain.request.dto.BoardListResponseDto;
import com.example.week3_back.domain.request.dto.BoardRequestDto;
import com.example.week3_back.domain.request.dto.BoardResponseDto;
import com.example.week3_back.domain.service.BoardService;

import java.util.List;

@Slf4j
@RequestMapping("/board")
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 글 등록
    @PostMapping()
    public ResponseEntity<ApiUtil.ApiSuccessResult<Long>> createBoard(
            @RequestBody BoardRequestDto boardRequestDto){
        Long id = boardService.createBoard(boardRequestDto);
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.CREATED,id));
    }

    // 전체 목록 조회
    @GetMapping()
    public ResponseEntity<ApiUtil.ApiSuccessResult<List<BoardListResponseDto>>> getAllBoard(){
        List<BoardListResponseDto> allBoard = boardService.findAllBoard();
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.OK, allBoard));
    }


    //글 하나 조회
    @GetMapping("/{id}")
    public ResponseEntity<ApiUtil.ApiSuccessResult<BoardResponseDto>> getOneBoard(@PathVariable("id") Long id) {
        BoardResponseDto boardResponseDto = boardService.findOneBoard(id);
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.OK, boardResponseDto));
    }

    //수정
    @PutMapping("/{id}")
    public ResponseEntity<ApiUtil.ApiSuccessResult<Long>> updateBoard(@RequestBody BoardUpdateRequestDto boardUpdateRequestDto,
            @PathVariable("id") Long id){
            Long updateId = boardService.updateBoard(id,boardUpdateRequestDto);

            return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.OK,updateId));

    }

    //삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiUtil.ApiSuccessResult<?>> deleteBoard(@PathVariable("id") Long id){
        boardService.deleteBoard(id);
        return ResponseEntity.ok().body(ApiUtil.success(HttpStatus.OK));
    }

}