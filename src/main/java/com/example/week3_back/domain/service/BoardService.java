package com.example.week3_back.domain.service;

import com.example.week3_back.domain.entity.Board;
import com.example.week3_back.domain.repository.BoardRepository;
import com.example.week3_back.domain.request.dto.BoardListResponseDto;
import com.example.week3_back.domain.request.dto.BoardRequestDto;
import com.example.week3_back.domain.request.dto.BoardResponseDto;
import com.example.week3_back.domain.request.dto.BoardUpdateRequestDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;
    LocalDateTime nowTime = LocalDateTime.now();
    // 글 생성
    public Long createBoard(BoardRequestDto requestDto) {
        Board board = Board.builder()
                .writer(requestDto.writer())
                .body(requestDto.body())
                .title(requestDto.title())
                .writingTime(String.valueOf(nowTime))
                .build();
        boardRepository.save(board);

        return board.getId();
    }

    // 모든 글 가져오기
    public List<BoardListResponseDto> findAllBoard() {
        try{
            List<Board> boardList = boardRepository.findAll();

            List<BoardListResponseDto> responseDtoList = new ArrayList<>();

            for (Board board : boardList) {
                responseDtoList.add(
                        new BoardListResponseDto(board.getId(), board.getWriter(),board.getTitle(),board.getWritingTime())

                );
            }
            return responseDtoList;
        } catch (Exception e) {
        }
        return null;
    }

    // 글 하나 가져오기
    public BoardResponseDto findOneBoard(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow();
        return BoardResponseDto.builder()
                .title(board.getTitle())
                .writer(board.getWriter())
                .body(board.getBody())
                .writingTime(String.valueOf(nowTime)).build();
    }

    // 글 수정
    @Transactional
    public Long updateBoard(Long id, BoardUpdateRequestDto requestDto) {
        Board board = boardRepository.findById(id)
                .orElseThrow();

        board.update(requestDto);

        return board.getId();
    }

    // 삭제
    public void deleteBoard(Long id) {
        Board board = boardRepository.findById(id).orElseThrow();
        boardRepository.delete(board);
    }

}
